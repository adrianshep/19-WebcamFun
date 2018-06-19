const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch(err => {
      console.error(`OH NO!!!`, err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height)
  }, 16);

}

function takePhoto() {
  // played the sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the paintToCanvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createeElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.textContext = 'Download Image';
  strip.insertBefore(link, strip.firstChild);
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
