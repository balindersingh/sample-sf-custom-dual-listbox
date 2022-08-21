import {
  LightningElement,
  api,
  wire
} from "lwc";
import {
  ShowToastEvent
} from 'lightning/platformShowToastEvent';
import getRootItems from '@salesforce/apex/DualListBoxSample.getRootItems';
import getDetailItemsByRootItemValue from '@salesforce/apex/DualListBoxSample.getDetailItemsByRootItemValue';
import addRemoveMemberFromGroup from '@salesforce/apex/DualListBoxSample.addRemoveMemberFromGroup';

export default class DualListBoxSample extends LightningElement {
  @api
  values = [];
  @api
  options = [];
  currentMemberDetailId = '';
  @wire(getRootItems)
  wiredGetRootItems(value) {
    const {
      data,
      error
    } = value;
    if (data) {
      this.options = data;
      this.refreshCustomListBox(this.options, this.values, true);
    } else if (error) {
      this.options = undefined;
    }
  }
  refreshCustomListBox(options, values, enableDetailView) {
    let childCmp = this.template.querySelector('c-custom-list-box');
    if(childCmp){
      childCmp.setup(options, values, enableDetailView);
      childCmp.populateListBox();
    }
  }
  handleListboxChange(event) {
    this.values = event.detail;
  }
  handleListboxItemDetailView(event) {
    if (event.detail) {
      this.currentMemberDetailId = event.detail;
    } else {
      this.currentMemberDetailId = '';
    }
    this.refreshDetailViewOfCustomListBox();
  }
  handleMembersChange(event) {
    if (event.detail && this.currentMemberDetailId && this.currentMemberDetailId != '') {
      let listOfMemberToBeRemoved = [];
      let listOfMemberToBeAdded = [];
      let memberListToAdd = event.detail.toAdd;
      let memberListToRemove = event.detail.toRemove;
      if (memberListToAdd) {
        memberListToAdd.forEach(item => listOfMemberToBeAdded.push(item));
      }
      if (memberListToRemove) {
        memberListToRemove.forEach(item => listOfMemberToBeRemoved.push(item));
      }
      addRemoveMemberFromGroup({
          listOfMembersToAdd: listOfMemberToBeAdded,
          listOfMembersToRemove: listOfMemberToBeRemoved,
          currentMemberDetailId: this.currentMemberDetailId
        }).then((result) => {
          if (result.status == 'success') {
            this.currentMemberDetailId = '';
            this.refreshDetailViewOfCustomListBox();
            this.showToastMessage('Success', result.message, 'success');
          } else {
            this.showToastMessage('Error', result.message, 'error');
          }
        })
        .catch((error) => {
          this.showToastMessage('Error while unassigning member!', 'Something went wrong. Please contact your System Administrator.', 'error');
        })
    } else {
      this.showToastMessage('Error while unassigning member!', 'Something went wrong. Please contact your System Administrator.', 'error');
    }
  }

  refreshDetailViewOfCustomListBox() {
    if (this.currentMemberDetailId && this.currentMemberDetailId != '') {
      getDetailItemsByRootItemValue({
          rootItemValue: this.currentMemberDetailId
        }).then((result, status) => {
          this.populateDetailViewOfCustomListBox(result, true);
        })
        .catch((error) => {
          this.showToastMessage('Error while getting details!', 'Something went wrong. Please contact your System Administrator.', 'error');
        })
    } else {
      this.populateDetailViewOfCustomListBox(undefined);
    }
  }
  populateDetailViewOfCustomListBox(data, showToastIfNoRecord) {
    let objOfAllAndSelectedItems = {};
    if (data) {

      if (data.all?.length > 0) {
        objOfAllAndSelectedItems['all'] = data.all;
      }
      if (data.selected?.length > 0) {
        objOfAllAndSelectedItems['selected'] = data.selected;
      }
    }
    let childCmp = this.template.querySelector('c-custom-list-box');
    if(childCmp){
      if (objOfAllAndSelectedItems && objOfAllAndSelectedItems.all && objOfAllAndSelectedItems.all.length > 0) {
        childCmp.populateDetailView(objOfAllAndSelectedItems);
      } else {
        childCmp.populateDetailView(undefined);
        if (showToastIfNoRecord) {
          this.showToastMessage('Not found!', 'No further detail found.', 'warning');
        }
      }
    }
  }

  showToastMessage(titleText, messageText, variantType) {
    const evt = new ShowToastEvent({
      title: titleText,
      message: messageText,
      variant: variantType,
    });
    this.dispatchEvent(evt);
  }
}