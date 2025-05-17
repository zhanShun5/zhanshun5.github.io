
// Music player start 

// This component is where the magic happens!
class MusicPlayer {
    constructor(element, song_data) {
        this.parent_element = element;
        this.audio = null;
        this.current_track_index = -1;
        this.track_element = this.parent_element.querySelector(".SP-track-name");
        this.track_scrolling_left = true;
        this.artist_element = this.parent_element.querySelector(".SP-artist-name");
        this.artist_scrolling_left = true;
        this.song_data = song_data;
        this.isDragging = false;
        this.start();
    }

    start = () => {
        this.initializeButtons();
        this.initializeListItems();
        this.initializeStatefulRenderingInterval();
        this.initializeProgressBar();
    }

    initializeStatefulRenderingInterval = () => {
        setInterval(() => {
            this.scrollTrackText();
            this.scrollArtistText();
            this.updateProgressBar(this.getSongProgressPercent(this.audio) * 100)
            this.updateProgressText(this.audio);
            this.updateDurationText(this.audio);
            this.renderPauseOrPlayButton();
        }, 50);
    }

    initializeButtons = () => {
        let buttons = this.parent_element.querySelectorAll('.SP-button');
        buttons.forEach((button) => {
            button.addEventListener('click', (event) => {
                switch (true) {
                    case event.target.classList.contains("SP-play"):
                        this.play_song();
                        break;
                    case event.target.classList.contains("SP-pause"):
                        this.pause_song();
                        break;
                    case event.target.classList.contains("SP-next"):
                        this.next_song();
                        break;
                    case event.target.classList.contains("SP-prev"):
                        this.prev_song();
                        break;
                    case event.target.classList.contains("SP-stop"):
                        this.stop_song();
                        break;
                    default:
                        break;
                }
            });
        });
    }

    initializeListItems = () => {
        let buttons = this.parent_element.querySelectorAll('.SP-song-item');
        buttons.forEach((button, index) => {
            button.addEventListener('click', (event) => {
                this.play_song(index);
            });
        });
    }

    initializeProgressBar = () => {
        let progressKnob = this.parent_element.querySelector('.SP-progress-bar-knob');
        let progressBar = this.parent_element.querySelector('.SP-progress-bar');
        progressKnob.addEventListener('pointerdown', (event) => {
            this.isDragging = true;
            event.preventDefault();
        });

        this.parent_element.addEventListener('pointermove', (event) => {
            if (!this.isDragging || !this.audio) return;
            const boundingRect = progressBar.getBoundingClientRect();
            let percent = (event.clientX - boundingRect.left) / boundingRect.width;
            percent = Math.max(0, Math.min(1, percent));
            this.audio.currentTime = this.audio.duration * percent;
            this.updateProgressBar(percent * 100);
        });
        document.addEventListener('pointerup', () => {
            this.isDragging = false;
        });
        
        progressBar.addEventListener('click', (event) => {
            if (this.audio == null || this.isDragging) return; // Skip if dragging or audio is not initialized
            const bounding = progressBar.getBoundingClientRect();
            const percent = (event.clientX - bounding.left) / bounding.width;
            this.audio.currentTime = this.audio.duration * percent;
            this.updateProgressBar(percent * 100);
        });
    }

    play_song = (track_number) => {
        // If the audio is paused and the track number is the same as the current track, just resume playing
        if (this.audio && this.audio.paused && (track_number === this.current_track_index || track_number == null)) {
            this.audio.play();
            return;
        // If the audio is playing, but the play button is pressed, pause the audio
        } else if (this.audio && track_number == null) {
            this.audio.pause();
            return;
        }
        // Loop the song list if the track number is out of bounds
        if (!track_number && this.current_track_index === -1) {
            track_number = 0;
        } else if (track_number >= this.song_data.length) {
            track_number = 0;
        } else if (track_number < 0) {
            track_number = this.song_data.length - 1;
        }

        // Stop the current song if it is playing
        if (this.audio && !this.audio.paused) {
            this.stop_song();
        }
        
        // Play the song
        let song_url = this.song_data[track_number].url;
        this.audio = new Audio(song_url);
        this.audio.addEventListener('error', (e) => {
            console.error('Error loading audio:', e);
            console.log('Error code:', this.audio.error.code);
            console.log('Error message:', this.audio.error.message);
        });

        this.parent_element.querySelector(".SP-track-name").innerHTML = this.song_data[track_number].name;
        this.parent_element.querySelector(".SP-artist-name").innerHTML = this.song_data[track_number].artist;
        this.audio = new Audio(song_url);
        this.audio.addEventListener('ended', () => {
            this.audio.currentTime = 0;
            this.next_song();
        });
        this.audio.play();
        this.current_track_index = track_number;
    }
    
    pause_song = () => {
        this.audio.pause();
    }
    
    next_song = () => {
        let next_track_number = this.current_track_index + 1;
        if (next_track_number >= this.song_data.length) {
            next_track_number = 0;
        }
        this.play_song(next_track_number);
    }
    
    prev_song = () => {
        let prev_track_number = this.current_track_index - 1;
        if (prev_track_number < 0) {
            prev_track_number = this.song_data.length - 1;
        }
    
        this.play_song(prev_track_number);
    }
    
    stop_song = () => {
        this.audio.pause();
        this.audio = null;
        this.current_track_index = -1;
    }
    
    getSongProgressString = (audio_object) => {
        if (!audio_object) {
            return "0:00";
        }
        const current_time = audio_object.currentTime || 0;
        return `${Math.floor(current_time / 60)}:${Math.floor(current_time % 60).toString().padStart(2, '0')}`;
    }
    
    getSongDurationString = (audio_object) => {
        if (!audio_object) {
            return "0:00";
        }
        const duration = audio_object.duration || 0;
        return `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`
    }
    
    updateDurationText = (audio_object) => {
        let progressText = this.parent_element.querySelector('.SP-duration-total');
        progressText.innerHTML = this.getSongDurationString(audio_object);
    }
    
    updateProgressText = (audio_object) => {
        let progressText = this.parent_element.querySelector('.SP-duration-current');
        progressText.innerHTML = this.getSongProgressString(audio_object);
    }
    
    getSongProgressPercent = (audio_object) => {
        if (audio_object == null) return 0;
        const currentTime = audio_object.currentTime;
        const duration = audio_object.duration;
        return currentTime / duration;
    }

    updateProgressBar = (progressFloat) => {
        let progressTruncated = progressFloat.toFixed(2);
        let progressBar = this.parent_element.querySelector('.SP-progress-bar-fill');
        progressBar.style.width = progressTruncated + "%";
    }
    
    // This function scrolls the track text in the player when it is too long to fit in the container
    scrollTrackText = () => {
        if (this.track_element.scrollWidth > this.track_element.clientWidth + this.track_element.scrollLeft && this.track_scrolling_left) {
            this.track_element.scrollBy(1, 0);
        } else {
            this.track_scrolling_left = false;
        }
        if (!this.track_scrolling_left) {
            this.track_element.scrollBy(-0.5, 0);
            if (this.track_element.scrollLeft === 0) {
                this.track_scrolling_left = true;
            }
        }
    }
    
    // This function scrolls the artist text in the player when it is too long to fit in the container
    scrollArtistText = () => {
        if (this.artist_element.scrollWidth > this.artist_element.clientWidth + this.artist_element.scrollLeft && this.artist_scrolling_left) {
            this.artist_element.scrollBy(1, 0);
        } else {
            this.artist_scrolling_left = false;
        }
        if (!this.artist_scrolling_left) {
            this.artist_element.scrollBy(-0.5, 0);
            if (this.artist_element.scrollLeft === 0) {
                this.artist_scrolling_left = true;
            }
        }
    }
    
    // This hides the play button when the audio is playing and hides the pause button when the audio is paused
    renderPauseOrPlayButton = () => {
        let play_button = this.parent_element.querySelector('.SP-play');
        let pause_button = this.parent_element.querySelector('.SP-pause');
        if (this.audio && !this.audio.paused) {
            play_button.style.display = "none";
            pause_button.style.display = "block";
        } else {
            play_button.style.display = "block";
            pause_button.style.display = "none";
        }
    }
}

// Song files
let song_data_absolute = [
    {
        "name": "Gordon",
        "artist": "Gordons changes throughout the book 'Flowers for Algernon'.",
        "url": "https://raw.githubusercontent.com/zhanShun5/Music/master/Gordon.mp3"
    },
    {
        "name": "Dreaming Algernon",
        "artist": "The dying moments of the mouse, Algernon, from 'Flowers for Algernon'.",
        "url": "https://raw.githubusercontent.com/zhanShun5/Music/main/Dreaming_Algernon.mp3"
    },
    {
        "name": "Somewhere in Summer",
        "artist": "The last Summer spent with best friends, uncertain if there will be another one.",
        "url": "https://raw.githubusercontent.com/zhanShun5/Music/main/Somewhere%20in%20Summer.wav"
    },
    {
        "name": "Short Winter Wind",
        "artist": "Inspired by 'Snowdin' from 'Untertale'.",
        "url": "https://raw.githubusercontent.com/zhanShun5/Music/main/Short%20Winter%20Wind.wav"
    },
    {
        "name": "12.11.2023",
        "artist": "Upbeat Lofi.",
        "url": "https://raw.githubusercontent.com/zhanShun5/Music/main/12.11.2023%20Lofi.wav"
    }
];


// Load the song players manually >
let song_player_basic = document.querySelector(".StarrPlayer");
let basic_player = new MusicPlayer(song_player_basic, song_data_absolute);
