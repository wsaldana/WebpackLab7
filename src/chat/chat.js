//Walter Saldaña #19897

import '../chat/chatStyle.scss';
import {getUrlParam} from './readUserName';
import {autoResizeHeight} from './autoResize';

function validarURL(str) {
    const patron = new RegExp("^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$");
    console.log(patron.test(str));
    return patron.test(str);
}

function handleKeyPress(e){
    var key=e.keyCode || e.which;
    if (key==13){
        e.preventDefault();
        sendMsg();
    }
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

var ids = [];

//var username = prompt("Ingrese su nombre de usuario: ");
var username = getUrlParam("txtUserName", "Guest")

var body = (document.getElementsByTagName("body"))[0];

var displayName = document.getElementById("displayName");
displayName.innerHTML = username;

var msgContainer = document.getElementById("msgContainer");

var inputContainer = document.getElementById("inputContainer");

var input = document.getElementById("input");
input.addEventListener('input', autoResizeHeight, 0);
input.addEventListener('keypress', handleKeyPress);
input.placeholder = "Escríbe tu mensaje...";
input.maxLength = "140";

var btn = document.getElementById("btn");
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
                //msgBox.className = "msgBox";
                msgBox.classList = "msgBox animate__animated animate__bounceIn";
                
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

var sendIcon = document.getElementById("sendIcon");
btn.appendChild(sendIcon);
sendIcon.src = "../icons/send.png";

loadMessages(true);

var intervalId = window.setInterval(function(){
    loadMessages(false);
  }, 1000);
