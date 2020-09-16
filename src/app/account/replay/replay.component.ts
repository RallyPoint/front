import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../share/api.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.scss']
})
export class ReplayComponent implements OnInit {

  public replay: any;

  public categories: any[] = [];
  public languages: any[] = [];
  public succes: boolean;

  public previewImage;
  public changeInformationdForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required]),
    thumb: new FormControl('', [Validators.required]),
    desc: new FormControl('', []),
  }, [(control: FormGroup): ValidationErrors | null => {
    return null;
  }]);

  constructor( private apiService: ApiService,
               private route: ActivatedRoute) {
    this.route.params.subscribe((data) => {
      this.apiService.axios.get(`/replay/${data.replayId}`)
        .then((res) => {
          this.replay = res.data;
          this.previewImage = this.replay.thumb;
          this.changeInformationdForm.patchValue({
            title: this.replay.title,
            category: this.replay.catLevel.id,
            language: this.replay.catLanguage.id,
            desc:  this.replay.desc
          });
        });
      this.apiService.axios.get('categorie').then((res) => {
        this.languages = res.data.languages;
        this.categories = res.data.levels;
      });

    });
  }

  ngOnInit(): void {
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.changeInformationdForm.patchValue({
        thumb: file
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    }
  }

  changeInformationdSubmit(): void{

    this.succes = null;
    const formData = new FormData();
    formData.append('title', this.changeInformationdForm.get('title').value);
    formData.append('category', this.changeInformationdForm.get('category').value);
    formData.append('language', this.changeInformationdForm.get('language').value);
    formData.append('desc', this.changeInformationdForm.get('desc').value);
    if (this.changeInformationdForm.get('thumb').value){
      formData.append('thumb', this.changeInformationdForm.get('thumb').value);
    }

    this.apiService.axios.put('replay/' + this.replay.id, formData).then((res) => {
      this.replay = res.data;
      this.succes = true;
    }, () => {
      this.succes = false;
    });
  }

}
