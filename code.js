function createChat()
    {
    var div  = document.querySelector('div');
    var buttonAdd = document.querySelector('.plus');
    var ChatNumber=1;
    var chatMassage = [];
    var iframeMembers = [];
    var iframe, buttonSend, input, iframeName, name;

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
                buttonSend = iframeDocument.createElement('button');
                buttonSend.style.bottom = '0%';
                buttonSend.style.position = 'fixed'
                input = iframeDocument.createElement('input');
                input.style.bottom = '0%';
                input.style.right = '10%';
                input.style.position = 'fixed';
                iframes = window.frames[iframeName].document;
                iframes.body.appendChild(buttonSend);
                iframes.body.appendChild(input);
                name = iframeName;
                buttonSend.innerText = name;
                assignSendMessageHandler(buttonSend, input, name);
                ChatNumber++;
            }
        createIframe()
    }

    function assignSendMessageHandler(btn, input , nm) {
        btn.addEventListener('click', function() {
            sendMessage(input.value)
            input.value = '';
            name = nm;
            
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
                chat.innerText = name + ':' + ' '+ chatMassage[i];
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
