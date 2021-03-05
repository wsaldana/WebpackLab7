async function loadMessages(firstRun){
    fetch('http://3.129.101.133:3050/chats')
        .then(results => results.json())
        .then(json => json.forEach(msgText => {
            if(ids.includes(msgText.id) == false){
                var msgBox = document.createElement("div");
                msgContainer.appendChild(msgBox);
                msgBox.id = "msgBox";
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