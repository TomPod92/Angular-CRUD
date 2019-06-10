import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})

export class CampaignService {

  success:boolean = false;

  // creating an object of AngularFireDatabase
  constructor(private formBuilder: FormBuilder, private firebase: AngularFireDatabase) {}

  // all inserted campaigns will be stored in this variable which type is AngularFireList
  campaignList: AngularFireList<any>;

  // defines form name and what input will it contain
  campaignForm = new FormGroup({
    $key: new FormControl(null), // unique key, need it in firebase
    name: new FormControl('', Validators.required),
    keywords: new FormControl('', Validators.required),
    bid: new FormControl('', Validators.required),
    fund: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    town: new FormControl(''),
    radius: new FormControl('')
  })

  getCampaigns() {
    // get all campaigns from firebase
    this.campaignList = this.firebase.list('campaigns');
    // return an observable
    return this.campaignList.snapshotChanges();
  }

  addCampaign(campaign) {
    this.campaignList.push({
      name: campaign.name,
      keywords: campaign.keywords,
      bid: campaign.bid,
      fund: campaign.fund,
      status: campaign.status,
      town: campaign.town,
      radius: campaign.radius
    });
  }

  fillForm(campaign) {
    this.campaignForm.setValue(campaign);
  }

  updateCampaign(campaign) {
    this.campaignList.update(campaign.$key, {
      name: campaign.name,
      keywords: campaign.keywords,
      bid: campaign.bid,
      fund: campaign.fund,
      status: campaign.status,
      town: campaign.town,
      radius: campaign.radius
    });
  }

  deleteCampaign($key) {
    this.campaignList.remove($key);
  }
}
