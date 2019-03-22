import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { getCurrentView } from '@angular/core/src/render3';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {
  profile: any;
  profile$: any;
  currentSong$: any;
  currentSong: any;
  isPlaying: boolean;
  loading = false;
  isPaused: boolean;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.loading = true;
  }

  ionViewWillEnter() {
    this.getProfile();
    this.getCurrentSong();
  }

  getProfile() {
    this.profile$ = this.profileService.getProfile()
    .subscribe((data) => {
      return this.profile = data;
    },
    (err) => {
      console.error(err);
    });
  }

  getCurrentSong() {
    this.currentSong$ = this.profileService.getCurrentSong()
    .subscribe((data) => {
      this.loading = false;
      if (!data) {
        this.isPlaying = true;
      } else {
        if (!data.is_playing) {
          this.isPaused = true;
        } else {
          this.isPlaying = true;
        }
        return this.currentSong = data;
      }
    }, (err) => {
      this.loading = false;
      console.error(err);
    });
  }

  skipBack() {
    this.profileService.backCurrentSong()
    .subscribe(() => {
      this.isPlaying = true;
      this.isPaused = false;
    }, (err) => {
      console.error(err);
    });
    this.getCurrentSong();
  }

  playPause() {
    if (this.isPaused) {
    this.profileService.playCurrentSong()
    .subscribe(() => {
      this.isPlaying = true;
      this.isPaused = false;
    }, (err) => {
      console.error(err);
    }
    );
  } else {
    this.profileService.pauseCurrentSong()
    .subscribe(() => {
      this.isPlaying = false;
      this.isPaused = true;
    }, (err) => {
      console.error(err);
    });
  }
}

  skipForward() {
    this.profileService.forwardCurrentSong()
    .subscribe(() => {
      this.isPlaying = true;
      this.isPaused = false;
    }, (err) => {
      console.error(err);
    });
    this.getCurrentSong();
  }
}
