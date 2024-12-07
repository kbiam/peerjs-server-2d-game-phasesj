const peer = new Peer({
    host: 'localhost',
    port: 9000,
    path: '/peerjs'
})
peer.on('open', id => {
    document.getElementById('peer-id').value = id;
});


let localStream;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    localStream = stream;
}).catch(error => {
    console.error('Error accessing media devices.', error);
});

document.getElementById('connect-button').addEventListener('click', () => {
    const peerId = document.getElementById('connect-id').value;
    const call = peer.call(peerId, localStream);

    call.on('stream', remoteStream => {
        addVideoStream(remoteStream);
    });
});

peer.on('call', call => {
    call.answer(localStream);

    call.on('stream', remoteStream => {
        addVideoStream(remoteStream);
    });
});

function addVideoStream(stream) {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    document.getElementById('remote-video-container').append(video);
}