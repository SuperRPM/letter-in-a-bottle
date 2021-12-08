# letter-in-a-bottle

익명으로 무작위로 편지를 보내고 이를 다시 답장을 받는 1:1 펜팔 어플리케이션

## 왜 만들었는가?
유리병에 담아 보낸 편지가 50년뒤 4000km떨어진 곳에서 답장 받았다는 이야기를 듣고
많은 사람들에게도 이런 감동적인 경험이 있으면 좋겠다 싶었다.

~~그리고 이건 친환경적이기까지 하다.~~



이렇게 생겼다


<img src="https://user-images.githubusercontent.com/71825628/143171154-bfd8954b-844b-4ffa-a4ea-a8bc10d10dd1.jpeg"  width="320" height="530">

## 사용한 기술 스택
- nodejs
- express
- vue
- mySQL
- sequelize
- bootstrap

## 개발중 고민한 것들
### mvc 패턴
사실 몇몇 기능은 server/app.js에서 직접처리하거나
server/router.js에서 바로 처리하는게 훨씬 코드가 간결하고 만들기도 편하다.
그런데 그렇게 한두번의 예외를 두니까 기능들이 쌓이고 api가 많아질 수록
에러가 생기면 router에 직접만들어 놓고는 controller에서 왜 없는지 코드를 한참 찾게 된다.
안쓰면 안쓴만큼 고생한다.

에러났을 때 어디에서 에러가 났는지 명확하지 않을 때가 있다.
그 때 에러가 발생한 대략적인 기능을 유추하고 프로그램의 실행 프로세스를 유추해서 해당 기능이 있는 디렉토리로 에러 발생 예상범위를 좁힐 수 있다.

### 토큰 전달방식
jwt로 토큰을 발행해줬다. 이걸 전달해주는데 크게 두가지 방식이 있었다.
무얼 선택하든 완벽한 방법은 없다.
1. 헤더에 담아서 보내기
  * 장점: 옵션설정만으로 XSS방어가능, sciprt삽입 자체를 막을 수 있다고.
  * 단점: 하지만 헤더에 담아서 보내주면 CSRF에 취약하다고 한다.

2. Authorization Header에 담기
  * 장점: XSS, CSRF에 대해서 안전한다~~고 한다~~
  * 단점: 토큰의 저장위치가 안전하지 않다. 요청할 때마다 토큰을 담는 코드를 짜야한다.

2번 Authorization Header에 담았다.
두가지 방식의 공격 모두를 방지할 수 있다고 한다.
그러면 요청할 때마다 토큰을 담아줘야하는 번거로움을 감수하면 비교적 안전한 프로그램이되는게
코드를 계속써 넣어야하는 번거로움보다 이득이 크다고 판단했다.
그러면 안전하지 않은 토큰의 저장위치는 어떻게 할까?

### 토큰 저장위치
local storage에 저장했다.
다른사이트를 이용할 때 회원가입시나 기존에 로그인한 정보가 몇시간도 되지 않았는데 다시 로그인을 해야하는게 불편하고 번거롭게 느껴졌다.
그래서 (특히 회원가입시)자동으로 로그인이 되길 바랬다.
local storage에 저장하면 이 정보만 가지고도 로그인상태를 유지시켜줄 수 있으니까 간단하게 기능을 구현할 수 있을거 같아서 선택했다.

# 구현한 기능
## 회원 관리

- 기능: 회원가입
- 동작: axios로 요청을 받아서 비밀번호를 bcrypt.hash()를 이용해서 해싱한뒤 저장후 token을 response에 포함시켜 회원가입과 동시에 로그인

<details>
<summary>회원가입 소스코드 접기/펼치기</summary>
 
```javascript
export async function signup(req, res) {
    const { account, password, name, email, url } = req.body;
    const exist = await userData.findByAccount(account);
    if (exist) {
        return res.status(409).json({ message: `${account}는 이미 사용되고 있는 아이디 입니다.`});
    };
    const hash = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await userData.createUser({
        account,
        password : hash,
        name,
        email,
        url,
    });
    const token = createJwtToken(userId);
    res.status(200).json({ token, userId }); //userId return is not necessary
}

```
</details>

## 편지 가져오기

- 기능: 다른 사람이 쓴 편지를 가져온다.
- 동작: 자신이 쓴편지와 이미 답장이 된 편지를 제외한 편지들 중에서 랜덤하게 가져온다. 이 때 내가 답장하지 않은 편지를 하나 가지고 있다면 편지를 새로 가져올 수 없게 한다.


<details>
<summary>랜덤편지 가져오기 소스코드 접기/펼치기</summary>
 
letterData.checkMailbox로 이미 편지를 가지 있는 경우 답장하거 돌려보내지 않고 새 편지르 받을 수 없게한다.
답장 비율을 늘리려느 목적과 하나으 편직 동시에 두번으 답장을 받는 경우를 방지한다
```javascript
export async function getRandomLetter(req, res) {
    const alreadyGetMailId = await letterData.checkMailbox(req.userId);
    if (alreadyGetMailId) { 
        const existMail = await letterData.getLetterById(alreadyGetMailId)
        return res.status(200).json(existMail)
    }
    const UnrepliedLetter = await letterData.getUnrepliedLetter(req.userId);
    if (!UnrepliedLetter) {
        return res.status(404).json({ message: '아직 편지가 없어요! 다음에 다시 시도해 주세염' });
    }
    res.status(200).json(UnrepliedLetter)
```
</details>

<details>
 <summary>letter written by user are excluded</summary>
 
본인이 쓴 편지를 본인이 돌려받는걸 방지하기 위해 db에서 sequelize로 [Op.not] : {userId: userId} 조건을 준다.
```javascript
export async function getUnrepliedLetter(userId) {
    const unrepliedLetter = await Letter.findAll({
        ...JOIN_USER,
        where: { 
            receiver: 0,
            replied: 0, 
            [Op.not] : {userId: userId} // can not get letter more than one.
        },
        include: {
            ...JOIN_USER.include,
        },
    });
```
</details>

### 답장하기 

- 기능: 답장을 작성해서 db에 저장해주고 편지의 답장여부를 설정하고 유저의 받은편지함을 초기화시켜준다 

<details>
<summary>답장하기 controller 부분 접기/펼치기</summary>
 
#### controller
``` javascript
export async function postReply(req, res) {
    const { text } = req.body;
    const letterId = req.params.id;
    await letterData.createReply(text, req.userId, letterId);
    res.status(201).json({ message: 'reply success'});
}

```
</details>

<details>
<summary>답장하기 data 부분 접기/펼치기</summary>
 
#### data

```javascript
export async function createReply(text, userId, letterId) {
    let replyId = 0
    await Reply
    .create({ text, userId, letterId })
    .then((data) => {
        replyId = data.dataValues.id;
    })
    await User
    .findByPk(userId)
    .then((user) => {
        user.mail = 0
        user.save()
    })
    return await Letter.findByPk(letterId)
    .then((letter) => { 
        letter.replied = replyId;
        letter.save();
        return
    })
}
```
</details>

# Trouble shooting
