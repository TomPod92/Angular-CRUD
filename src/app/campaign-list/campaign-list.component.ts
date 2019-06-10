import { Component, OnInit } from "@angular/core";
import { CampaignService } from "../shared/campaign.service";

@Component({
  selector: "app-campaign-list",
  templateUrl: "./campaign-list.component.html",
  styleUrls: ["./campaign-list.component.scss"]
})
export class CampaignListComponent implements OnInit {
  constructor(private campaignService: CampaignService) {}
  campaignsArray = []; // array of campaigns converted from observable which comes from "getCampaigns" function
  emeraldsAccount;

  ngOnInit() {
    // initialize customerList variable when the page is loaded
    // it returns an observable
    this.campaignService.getCampaigns().subscribe(list => {

      this.emeraldsAccount = 100;
      
      this.campaignsArray = list.map(item => {

        // calculate new emerladsAccount value
        this.emeraldsAccount-=(item.payload.val().fund);

        // return an object will all values of particular campaign and its unique key
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
  }

  onDelete($key) {
    this.campaignService.deleteCampaign($key);
  }
}
