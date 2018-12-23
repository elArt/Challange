function createChat()
    {
    var div  = document.querySelector('div');
    var buttonAdd = document.querySelector('.plus');
    var ChatNumber=1;
    var chatMassage = [];
    var iframeMembers = [];
    var iframe, buttonSend, input, iframeName, name, close;

    buttonAdd.onclick  = ()=>{
        function createIframe()
            {
                iframe =  document.createElement('iframe');
                iframe.style.borderTopWidth = '25px';
                iframe.style.position ='relative';
                iframe.style.width = '300px';
                iframe.style.height = '350px';
                iframe.style.background = 'white';
                iframe.style.borderColor = 'blue';
                iframe.style.marginRight = '20px';
                iframeName ='iframe'+ChatNumber;
                iframe.name = iframeName;
                iframe.id = iframeName;
                iframeMembers.push(ChatNumber);
                div.appendChild(iframe);
                iframeElements()
            }

        function iframeElements()
            {
                var iframeDocument = window.frames[iframeName].document;
                var headerChat = iframeDocument.createElement('div');
                var gettingName = function(){ 
                    var nc = prompt('Name chat', '');
                    if (nc == ''){
                        return gettingName();
                        }
                    else{
                        return nc;
                        }
                }
                chatName = gettingName();
                headerChat.innerText = chatName;
                headerChat.style.fontWeight	 = 'bold'
                headerChat.style.textAlign = 'center';
                headerChat.style.color = 'blue';
                headerChat.style.position = 'fixed';
                headerChat.style.width = '290px';
                headerChat.style.top = '0px';
                headerChat.style.background = '#fff';
                close = iframeDocument.createElement('span');
                close.id  = 'chat' + ChatNumber;
                close.innerHTML = 'X';
                close.style.cursor = 'pointer';
                close.style.right = '6%';
                close.style.position = 'absolute'
                buttonSend = iframeDocument.createElement('button');
                buttonSend.style.bottom = '0%';
                buttonSend.style.position = 'fixed'
                buttonSend.style.width = '19%'
                buttonSend.style.left = '2%';
                input = iframeDocument.createElement('input');
                input.style.width = '78%'
                input.style.bottom = '0%';
                input.style.right = '2%';
                input.style.position = 'fixed';
                iframes = window.frames[iframeName].document;
                
                iframes.body.appendChild(headerChat);
                iframes.body.appendChild(buttonSend);
                iframes.body.appendChild(input);
                headerChat.appendChild(close);
                name = iframeName;
                buttonSend.innerText = 'Send';
                assignSendMessageHandler(buttonSend, input, name, ChatNumber, chatName);
                ChatNumber++;
            }
        createIframe()
    }

    function assignSendMessageHandler(btn, input , nm, ChatNumber, chatName) {
        
        close.onclick = ()=>{
            var iframeRemove = document.getElementById(nm);
            div.removeChild(iframeRemove);
            var idx = iframeMembers.indexOf(ChatNumber);
            iframeMembers.splice(idx, 1);

        } 


        btn.addEventListener('click', function() {
            sendMessage(input.value)
            input.value = '';
            name = nm;
            cN = chatName;
        });
        
    var chatMove = document.getElementById(nm);
    chatMove.onmousedown = function(e) {
    var coords = getCoords(chatMove);
    var shiftX = e.pageX - coords.left;
    var shiftY = e.pageY - coords.top;
    chatMove.style.zIndex = 1000;
    chatMove.style.position = 'absolute';
    moveAt(e);

    function moveAt(e) {
        chatMove.style.left = e.pageX - shiftX + 'px';
        chatMove.style.top = e.pageY - shiftY + 'px';
    }
    
    document.onmousemove = function(e) {
        moveAt(e);
    };

    chatMove.onmouseup = function() {
        document.onmousemove = null;
        chatMove.onmouseup = null;
    };}

    chatMove.ondragstart = function() {
        return false;
        };

    function getCoords(elem) { 
        var box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };}

    function sendMessage(msg) {
        window.parent.postMessage(msg, '*');
    }}

    function assignReceiveMessageHandler() {
        function notifyAllFrames(msg) {
            chatMassage.push(msg);
            iframeMembers.forEach(function(items){
                
                chat = document.createElement('p');
                chat.style.background = 'lightblue';
                chat.style.borderRadius = '10%';
                iframeName ='iframe'+items;
                iframe.name = iframeName;
                iframes = window.frames[iframeName].document;
                var iframeBody = iframes.body;
                iframeBody.appendChild(chat);
                iframeBody.style.marginBottom = '60px';
                iframeBody.style.marginTop = '25px';
                iframeBody.scrollTop = 9999;
                
                for ( var i = 0 ; i < chatMassage.length; i++ ){
                    if(iframeName== name){
                        chat.innerHTML = '';
                        chat.style.background = 'rgb(102, 255, 0)';
                        chat.style.textAlign = 'right';
                        chat.innerText = chatMassage[i] ;
                    }
                    else{
                        chat.innerHTML = '';
                        chat.innerText = cN + ':' + ' '+ chatMassage[i];
            }}})};

        window.addEventListener('message', function(event) {
            if (event.data !== '')
            {
            notifyAllFrames(event.data)
            }
            
            else{
                return
            }
        })}
        
    assignReceiveMessageHandler();
}
createChat()
//https://github.com/elArt/Challange