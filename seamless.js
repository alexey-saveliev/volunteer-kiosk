var playlist =
    [
        "/mp4/8s.mp4",
        "/mp4/9s.mp4",
        "/mp4/10s.mp4"
      
    ];

var videoContainer;
var output;
var nextVideo;
var videoObjects;    
var fireworks;
var fireworksContainer;
var nextActiveVideo = 0;

window.onload = function() {
    videoContainer = document.getElementById("videoContainer");
    output = document.getElementById("output");

    fireworks = document.getElementById("fireworks");
    fireworksContainer = document.getElementById("fireworksContainer");

    /*
    fireworks = document.createElement('video');
    fireworks.preload = "auto";
    fireworks.style.display = "none";
    fireworks.muted = true;
    fireworks.src = "/mp4/fireworks.mp4";
    */
    fireworks.onended = function () {
        fireworksContainer.style.display = "none";
        setTimeout(displayFireworks, 10000)
    }
    // videoContainer.appendChild(fireworks);
    

    videoObjects =
    [
        document.createElement('video'),
        document.createElement('video')
    ];

    videoObjects[0].index = 0;
    videoObjects[1].index = 1;

    initVideoElement(videoObjects[0]);
    initVideoElement(videoObjects[1]);

    videoObjects[0].autoplay = true;
    videoObjects[0].muted = true;
    videoObjects[0].src = playlist[nextActiveVideo];
    videoContainer.appendChild(videoObjects[0]);
    
    videoObjects[1].muted = true;
    videoObjects[1].style.display = 'none';
    videoContainer.appendChild(videoObjects[1]);

    

    setTimeout(displayFireworks, 10000)
}

function displayFireworks () {
    fireworksContainer.style.display = "block";
    fireworks.play();
}

function initVideoElement(video)
{
    video.playsinline = true;
    video.muted = false;
    video.preload = 'auto'; //but do not set autoplay, because it deletes preload

    //loadedmetadata is wrong because if we use it then we get endless loop
    video.onplaying = function(e)
    {
        output.innerHTML = 'Current video source index: ' + nextActiveVideo;

        //select next index. If is equal playlist.length then it is 0
        nextActiveVideo = ++nextActiveVideo % playlist.length;

        //replace the video elements against each other:
        if(this.index == 0)
            nextVideo = videoObjects[1];
        else
            nextVideo = videoObjects[0];

        nextVideo.src = playlist[nextActiveVideo];
        nextVideo.pause();
    };

    video.onended = function(e)
    {
        this.style.display = 'none';
        nextVideo.style.display = 'block';
        nextVideo.play();
    };
}