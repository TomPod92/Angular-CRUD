import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../shared/campaign.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  constructor(public campaignService: CampaignService) { } //create object of form class

  submitted: boolean = false; // flag which checks if the form was submitted or not, warning will be shown if it is set to TRUE
  formControls = this.campaignService.campaignForm.controls; // it will store all form constrols from campaign.service which will make form validation easier

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

    // if the form is valid meaning if all required fields are populated
    if(this.campaignService.campaignForm.valid) {
      // if there is no "$key value" 
      // $key is set to null by default
      // there will be a $key value if we populate that vield with "edit button"
      if(this.campaignService.campaignForm.get('$key').value == null) {
        // insert campaign into the database
        this.campaignService.addCampaign(this.campaignService.campaignForm.value);
      } else {
        // update exisiting campaign 
        this.campaignService.updateCampaign(this.campaignService.campaignForm.value);
      }

      // reset the flag and form fields
      this.submitted = false;
      this.campaignService.campaignForm.reset();
    }

  }

}
