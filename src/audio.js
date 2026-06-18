// Tiny shared audio singleton so the background track can be started by the
// envelope intro and then controlled (mute/play) from anywhere else in the app.
import { reactive } from 'vue'

const audioEl = new Audio('/bgm.mp3')
audioEl.loop = true
audioEl.volume = 0.55

export const audioState = reactive({
  playing: false,
})

export function startBgm() {
  audioEl.play().then(() => {
    audioState.playing = true
  }).catch(() => {
    audioState.playing = false
  })
}

export function toggleBgm() {
  if (audioState.playing) {
    audioEl.pause()
    audioState.playing = false
  } else {
    audioEl.play().then(() => { audioState.playing = true }).catch(() => {})
  }
}
