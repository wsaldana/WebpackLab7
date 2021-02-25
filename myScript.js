//Walter Saldaña #19897

function handleKeyPress(e){
    var key=e.keyCode || e.which;
    if (key==13){
        e.preventDefault();
        sendMsg();
    }
}

function autoResizeHeight(){
    this.style.height="10px";
    this.style.height= this.scrollHeight+"px";
}

function getMessages(){
    var json;
    fetch('http://3.129.101.133:3050/chats')
        .then(results => results.json())
        .then(json => json);
}

function postMessages(msg){
    fetch('http://3.129.101.133:3050/add',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description: msg,
            user: username
        })
    });
}

function validarURL(str) {
    const patron = new RegExp("^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$");
    console.log(patron.test(str));
    return patron.test(str);
}

var ids = [];

var username = prompt("Ingrese su nombre de usuario: ");

var body = (document.getElementsByTagName("body"))[0];
body.style.margin = "auto";
body.style.backgroundColor = "rgb(51,51,51)";
body.style.position = "relative";
body.style.overflow = "none";
body.style.overflow = "auto";

var header = document.createElement("div");
body.appendChild(header);
header.style.position = "fixed";
header.style.width = "100%";
header.style.height = "70px";
header.style.backgroundColor = "rgb(30,30,30)";
header.style.boxShadow = "0 5px 10px 0 black";
header.style.zIndex = "10";
header.style.textAlign = "center"

var displayName = document.createElement("h2");
header.appendChild(displayName);
displayName.style.color = "white";
displayName.style.fontFamily = "Arial, Helvetica, sans-serif";
displayName.innerHTML = username;

var msgContainer = document.createElement("div");
body.appendChild(msgContainer);
msgContainer.id = "msgContainer";
//msgContainer.style.position = "fixed";
msgContainer.style.padding = "20px";
msgContainer.style.left = "15px";
msgContainer.style.right = "15px";
msgContainer.style.top = "70px";
msgContainer.style.bottom = "65px";
msgContainer.style.display = "flex";
msgContainer.style.flexDirection = "column";
msgContainer.style.justifyContent = "flex-end";
msgContainer.style.alignItems = "flex-end";
msgContainer.style.marginBottom = "45px";
msgContainer.style.overflow = "auto";

var inputContainer = document.createElement("div");
body.appendChild(inputContainer);
inputContainer.style.height = "wrap-content";
inputContainer.style.position = "fixed";
inputContainer.style.display = "flex";
inputContainer.style.alignItems = "stretch";
inputContainer.style.bottom = "15px";
inputContainer.style.left = "15px";
inputContainer.style.right = "80px";
inputContainer.style.backgroundColor = "rgb(70,70,70)";
inputContainer.style.boxShadow = "0 5px 10px 0 black";
inputContainer.style.borderRadius = "12px";

var input = document.createElement("textarea");
inputContainer.appendChild(input);
input.addEventListener('input', autoResizeHeight, 0);
input.addEventListener('keypress', handleKeyPress);
input.style.width = "100%";
input.style.height = "25px";
input.placeholder = "Escríbe tu mensaje...";
input.style.margin = "10px";
input.style.fontSize = "20px";
input.style.backgroundColor = "transparent";
input.style.color = "white";
input.style.outline = "none";
input.style.overflow = "hidden";
input.style.resize = "none"
input.style.border = "0";
input.style.fontFamily = "Arial, Helvetica, sans-serif";
input.maxLength = "140";

var btn = document.createElement("button");
body.appendChild(btn);
btn.style.margin = "0";
btn.style.position = "fixed";
btn.style.width = "50px";
btn.style.height = "50px";
btn.style.right = "15px";
btn.style.bottom = "15px";
btn.style.borderRadius = "50%";
btn.style.border = "0";
btn.style.backgroundColor = "rgb(70,70,70)";
btn.style.boxShadow = "0 5px 10px 0 black";
btn.addEventListener("click", sendMsg);

function sendMsg(txt){
    var msgText = input.value;
    var validText = false;

    for(var i=0; i<msgText.length; i++){
        if(msgText.charAt(i) != " " && msgText != "\n"){
            validText = true;
        }
    }

    if((msgText != "") && validText){
        /*
        var msgBox = document.createElement("div");
        msgContainer.appendChild(msgBox);
        msgBox.style.position = "relative";
        msgBox.style.padding = "20px";
        msgBox.style.marginBottom = "15px";
        msgBox.style.width = "wrap-content";
        msgBox.style.maxWidth = "60%";
        msgBox.style.height = "wrap-content";
        msgBox.style.backgroundColor = "rgb(60,60,60)";
        msgBox.style.borderRadius = "12px 12px 0 12px";
        msgBox.style.boxShadow = "0 2px 10px 0 black";
        msgBox.style.fontSize = "20px";
        msgBox.style.color = "white";
        msgBox.style.fontFamily = "Arial, Helvetica, sans-serif";
        //msgBox.innerHTML = msgText;

        if(msgText.trim().toLowerCase().match(/.(jpeg|jpg|gif|png)$/) != null){
            msgBox.innerHTML = msgText;
            var img = document.createElement("img");
            msgBox.appendChild(img);
            img.src = msgText;
            img.style.width = "375px";
        }else if(validarURL(msgText)){
            msgBox.innerHTML = "<a href='"+msgText+"' style='color:rgb(51,102,204)'>" + msgText + "</a>";

            fetch(msgText)
                .then(results => results.json())
                .then(console.log);
        }else{
            msgBox.innerHTML = msgText;
            //msgBox.innerHTML = "<b class='uname'>" + msgText.user + "</b><br>" + msgText.description;
        }

        document.documentElement.scrollTop = document.documentElement.scrollHeight;

        /*
        var msgBoxTail = document.createElement("div");
        msgBox.appendChild(msgBoxTail);
        msgBoxTail.style.position = "absolute";
        msgBoxTail.style.bottom = "0";
        msgBoxTail.style.right = "-20px";
        msgBoxTail.style.borderTop = "10px solid transparent";
        msgBoxTail.style.borderRight = "10px solid transparent";
        msgBoxTail.style.borderBottom = "10px solid rgb(60,60,60)";
        msgBoxTail.style.borderLeft = "10px solid rgb(60,60,60)";
        */

        postMessages(msgText);
    }

    input.value = "";
    input.style.height = "25px";
}

async function loadMessages(firstRun){
    fetch('http://3.129.101.133:3050/chats')
        .then(results => results.json())
        .then(json => json.forEach(msgText => {
            if(ids.includes(msgText.id) == false){
                var msgBox = document.createElement("div");
                msgContainer.appendChild(msgBox);
                //msgBox.style.position = "relative";
                msgBox.style.padding = "20px";
                msgBox.style.marginBottom = "15px";
                msgBox.style.width = "wrap-content";
                msgBox.style.maxWidth = "60%";
                msgBox.style.height = "wrap-content";
                msgBox.style.Left = "20px";
                msgBox.style.backgroundColor = "rgb(60,60,60)";
                msgBox.style.boxShadow = "0 2px 10px 0 black";
                msgBox.style.fontSize = "20px";
                msgBox.style.color = "white";
                msgBox.style.fontFamily = "Arial, Helvetica, sans-serif";
                if(msgText.user == username){
                    msgBox.style.borderRadius = "12px 12px 0 12px";
                    msgBox.style.alignSelf = "flex-end";
                }else{
                    msgBox.style.borderRadius = "12px 12px 12px 0";
                    msgBox.style.alignSelf = "flex-start";
                }
                

                if(msgText.description.trim().toLowerCase().match(/.(jpeg|jpg|gif|png)$/) != null){
                    msgBox.innerHTML = "<b class='uname'>"+ msgText.user + "</b><br>";
                    var img = document.createElement("img");
                    msgBox.appendChild(img);
                    img.src = msgText.description;
                    img.style.width = "375px";
                }else if(validarURL(msgText.description)){
                    msgBox.innerHTML = "<b class='uname'>" + msgText.user + "</b><br><a href='"+msgText.description+"' style='color:rgb(51,102,204)'>" + msgText.description + "</a><br>";
                    var website = document.createElement("iframe");
                    msgBox.appendChild(website);
                    website.src = 'https://s.wordpress.com/mshots/v1/'+msgText.description;
                    website.style.width = "375px";
                }else{
                    msgBox.innerHTML = "<b class='uname'>" + msgText.user + "</b><br>" + msgText.description;
                }
                if(firstRun || (msgText.user == username)){
                    document.documentElement.scrollTop = document.documentElement.scrollHeight;
                }

                ids.push(msgText.id);
            }
        }));
}

var sendIcon = document.createElement("img");
btn.appendChild(sendIcon);
sendIcon.src = "icons/send.png";
sendIcon.style.width = "25px";
sendIcon.style.height = "25px";
sendIcon.style.marginLeft = "-2px";
sendIcon.style.marginTop = "2px";

loadMessages(true);

var intervalId = window.setInterval(function(){
    loadMessages(false);
  }, 1000);
