import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class RecruitementService {



  // host = "https://23.101.22.93/DigiOfficeBSINTAPI";
  //  host = "http://103.133.214.197/CoreDigiRecuritmentAPI";
  // host="http://localhost:1807/"

  host = "http://23.101.22.93/CoreDigiRecruitementAPI";
  public host1 = "https://asticom.digiofficeapp.com/SupportAPI";

  private url: string = "";
  showvid: any;
  URL: any;
  data: any;
  constructor(private http: HttpClient) { }

  public GetLoginTypeMaster() {
    return this.http.get<any[]>(this.host + "/Vendor/GetLoginTypeMaster");
  }

  public GetDepartment() {
    return this.http.get<any[]>(this.host + "/Vendor/GetDepartment");
  }

  public GetClientMaster() {

    return this.http.get<any[]>(this.host + "/Master/GetClientMaster");
  }

  public GetClientStaff() {

    return this.http.get<any[]>(this.host + "/Master/GetClientStaff");
  }


  public InsertClientMaster(data: any) {
    this.url = this.host + "/Master/InsertClientMaster";
    return this.http.post(this.url, data);
  }

  public InsertClientStaff(data: any) {
    this.url = this.host + "/Master/InsertClientStaff";
    return this.http.post(this.url, data);
  }


  public GetUsersdetailsForHRLogin(Name: any, Password: any) {
    return this.http.get<any[]>(this.host + "/User/GetUsersdetailsForHRLogin?Name=" + Name + "&Password=" + Password);
  }

  public GetUsersdetailsMob(Name: any, Password: any) {
    return this.http.get<any[]>(this.host + "/User/GetUsersdetailsMob?Name=" + Name + "&Password=" + Password);
  }

  public GetUsersdetailsForManagerLogin(Name: any, Password: any) {
    return this.http.get<any[]>(this.host + "/User/GetUsersdetailsForManagerLogin?Name=" + Name + "&Password=" + Password);
  }

  public GetUsersdetailsForFinanceLogin(Name: any, Password: any) {
    return this.http.get<any[]>(this.host + "/User/GetUsersdetailsForFinanceLogin?Name=" + Name + "&Password=" + Password);
  }

  public GetAdmin(Name: any, Password: any) {
    return this.http.get<any[]>(this.host + "/User/GetAdmin?Name=" + Name + "&Password=" + Password);
  }

  public GetJob_Requirements() {
    return this.http.get<any[]>(this.host + "/Vendor/GetJob_Requirements");
  }

  public GetCandidateRegistration() {
    return this.http.get<any[]>(this.host + "/Vendor/GetCandidateRegistration");
  }


  public UpdateCandidateRegistrationAcceptReject(id: any, typeid: any, shortlist: any) {
    return this.http.get<any[]>(this.host + "/Vendor/UpdateCandidateRegistrationAcceptReject?ID=" + id + '&TypeID=' + typeid + '&ShortlistionNotes=' + shortlist);
  }

  public GetStaffs() {
    return this.http.get<any[]>(this.host + "/Vendor/GetStaffs");
  }

  public UpdateCandidateInterviewSchedule(data: { ID: any; StaffID: any; Date: any; TimeID: any; Notes: any; }) {
    this.url = this.host + "/Vendor/UpdateCandidateInterviewSchedule";
    return this.http.post(this.url, data);
  }

  public GetSlotsMasterByStaffID(startdate: any, staffid: any) {
    return this.http.get<any[]>(this.host + "/Vendor/GetSlotsMasterByStaffID?Date=" + startdate + '&StaffID=' + staffid);
  }

  public GetUserslist() {
    return this.http.get<any[]>(this.host + "/User/GetUserslist");
  }

  public RejectInterview(id: any, typeid: any, rinterview: any) {
    return this.http.get<any[]>(this.host + "/Vendor/RejectInterview?ID=" + id + '&TypeID=' + typeid + '&Interviewercomments=' + rinterview);
  }

  public UploadImages(files: any) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any>(this.host + "/Building/UploadImages/", formdata);
  }
  public UpdateOfferLetter(data: any) {
    this.url = this.host + "/Vendor/UpdateOfferLetter";
    return this.http.post(this.url, data);
  }
  public UpdateCandidateJoiningDate(data: any) {
    this.url = this.host + "/Vendor/UpdateCandidateJoiningDate";
    return this.http.post(this.url, data);
  }

  public sendemail(data: any) {
    this.url = this.host + "/Vendor/sendemail";
    return this.http.post(this.url, data);
  }
  public AcceptRejectOffer(id: any, typeid: any, offercomments: any) {
    return this.http.get<any[]>(this.host + "/Vendor/AcceptRejectOffer?ID=" + id + '&TypeID=' + typeid + '&OfferComments=' + offercomments);
  }

  public UsersHr() {

    return this.http.get<any[]>(this.host + "/Vendor/UsersHr");
  }
  public InsertJob_Requirements(data: any) {
    this.url = this.host + "/Vendor/InsertJob_Requirements";
    return this.http.post(this.url, data);
  }

  public UpdateVendor(data: any) {
    debugger
    this.url = this.host + "/User/UpdateVendorforjob";
    return this.http.post(this.url, data);
  }

  public GetUserslist1() {
    return this.http.get<any[]>(this.host + "/User/GetUserslist");
  }

  public InsertCandidateRegistration(data: any) {
    this.url = this.host + "/Vendor/InsertCandidateRegistration";
    return this.http.post(this.url, data);
  }

  public AttachmentsUpload(files: any) {
    debugger
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    debugger
    let APIURL = this.host + "/Master/UploadImages/";
    return this.http.post(APIURL, formdata);
  }

  public InsertRecruiterMaster(data: any) {
    this.url = this.host + "/User/InsertRecruiterMaster";
    return this.http.post(this.url, data);
  }

  public GetRecruiterMaster() {
    return this.http.get<any[]>(this.host + "/User/GetRecruiterMaster");
  }

  public InsertRecruiterStaff(data: any) {
    this.url = this.host + "/User/InsertRecruiterStaff";
    return this.http.post(this.url, data);
  }

  public GetRecruiterStaff() {
    return this.http.get<any[]>(this.host + "/User/GetRecruiterStaff");
  }

  public GetSourcingMaster() {
    return this.http.get<any[]>(this.host + "/Master/GetSourcingMaster");
  }

  public GetVendor_Dasboard() {
    debugger
    return this.http.get<any[]>(this.host + "/Master/GetVendor_Dasboard");
  }
  public GetVendor_Staff() {
    debugger
    return this.http.get<any[]>(this.host + "/Master/GetVendor_Staff");
  }

  public InsertVendor_Staff(data: any) {
    this.url = this.host + "/Master/InsertVendor_Staff";
    return this.http.post(this.url, data);
  }


  public DeleteVendor_Staff(ID: any) {
    debugger
    return this.http.get<any[]>(this.host + "/Master/DeleteVendor_Staff?ID=" + ID);
  }

  public InsertVendor_Dasboard(data: any) {
    this.url = this.host + "/Master/InsertVendor_Dasboard";
    return this.http.post(this.url, data);
  }

  public UpdateVendor_Dasboard(data: any) {
    debugger
    this.url = this.host + "/Master/UpdateVendor_Dasboard";
    return this.http.post(this.url, data);
  }


  public UpdateVendor_Staff(data: any) {
    debugger
    this.url = this.host + "/Master/UpdateVendor_Staff";
    return this.http.post(this.url, data);
  }

  public DeleteVendor_Dasboard(ID: any) {
    debugger
    return this.http.get<any[]>(this.host + "/Master/DeleteVendor_Dasboard?ID=" + ID);
  }


  public GetSourcigStaff() {
    debugger
    return this.http.get<any[]>(this.host + "/Master/GetSourcigStaff");
  }

  public InsertSourcigStaff(data: any) {
    this.url = this.host + "/Master/InsertSourcigStaff";
    return this.http.post(this.url, data);
  }

  public InsertSourcigMaster(data: any) {
    this.url = this.host + "/Master/InsertSourcingMaster";
    return this.http.post(this.url, data);
  }


  public DeleteRecruiterStaff(id: any) {
    debugger
    let APIURL = this.host + "/User/DeleteRecruiterStaff?ID=" + id;
    return this.http.get<any[]>(APIURL);
  }

  public DeleteSourcigStaff(id: any) {
    debugger
    let APIURL = this.host + "/Master/DeleteSourcigStaff?ID=" + id;
    return this.http.get<any[]>(APIURL);
  }

  public DeleteRecruiterMaster(id: any) {
    debugger
    let APIURL = this.host + "/User/DeleteRecruiterMaster?ID=" + id;
    return this.http.get<any[]>(APIURL);
  }

  public DeleteSourcingMaster(id: any) {
    debugger
    let APIURL = this.host + "/Master/DeleteSourcingMaster?ID=" + id;
    return this.http.get<any[]>(APIURL);
  }


  public UpdateRecruiterStaff(data: any) {
    debugger
    this.url = this.host + "/User/UpdateRecruiterStaff";
    return this.http.post(this.url, data);
  }

  public UpdateRecruiterMaster(data: any) {
    debugger
    this.url = this.host + "/User/UpdateRecruiterMaster";
    return this.http.post(this.url, data);
  }

  public UpdateSourcingMaster(data: any) {
    debugger
    this.url = this.host + "/Master/UpdateSourcingMaster";
    return this.http.post(this.url, data);
  }

  public UpdateSourcingStaff(data: any) {
    debugger
    this.url = this.host + "/Master/UpdateSourcingStaff";
    return this.http.post(this.url, data);
  }
  public DeleteClientMaster(ID: any) {
    debugger
    return this.http.get<any[]>(this.host + "/Master/DeleteClientMaster?ID=" + ID)
  }

  public DeleteClientStaff(ID: any) {
    debugger
    return this.http.get<any[]>(this.host + "/Master/DeleteClientStaff?ID=" + ID)
  }

  public UpdateClientMaster(data: any) {
    debugger
    this.url = this.host + "/Master/UpdateClientMaster";
    return this.http.post(this.url, data);
  }

  public UpdateClientStaff(data: any) {
    debugger
    this.url = this.host + "/Master/UpdateClientStaff";
    return this.http.post(this.url, data);
  }

  public GetRoleType() {
    debugger
    return this.http.get<any[]>(this.host + "/MasterDemo/GetRoleType?UserTypeID=1");
  }


  public AssignRecruiter(data: any) {
    debugger
    this.url = this.host + "/Master/AssignRecruiter";
    return this.http.post(this.url, data);
  }

  public EnableClientStaff(data: any) {
    debugger
    this.url = this.host + "/Master/EnableClientStaff";
    return this.http.post(this.url, data);
  }

  public EnableCompanyStaff(data: any) {
    debugger
    this.url = this.host + "/Master/EnableCompanyStaff";
    return this.http.post(this.url, data);
  }

  public EnableVendorStaff(data: any) {
    debugger
    this.url = this.host + "/Master/EnableVendorStaff";
    return this.http.post(this.url, data);
  }

  public UpdateJobPost(data: any) {
    debugger
    this.url = this.host + "/User/UpdateJobPost";
    return this.http.post(this.url, data);
  }


  public InsertAttachment(data: any) {
    debugger;
    this.url = this.host1 + '/Master/InsertAttachment';
    return this.http.post(this.url, data);
  }

  public InsertSupportTickets(data: any) {
    debugger;
    this.url = this.host1 + '/Master/InsertSupportTickets';
    return this.http.post(this.url, data);
  }

  public AttachmentsUploadsss(files: any) {
    debugger
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }

    debugger
    let APIURL = this.host1 + "Master/UploadImages/";
    return this.http.post(APIURL, formdata);
  }

  public GetSupportTickets() {
    return this.http.get<any[]>(
      this.host1 + "/Master/GetSupportTickets"
    );
  }

  public GetSupportAttachment() {

    return this.http.get<any[]>(this.host1 + "/Master/GetSupportAttachment");
  }

  public DeleteSupportTickets(ID: any) {
    return this.http.get<any[]>(
      this.host1 + "/Master/DeleteSupportTickets?ID=" + ID);
  }


  public GetJobDescriptionMaster() {

    return this.http.get<any[]>(this.host + "/Vendor/GetJobDescriptionMaster");
  }

  public DeleteJobDescriptionMaster(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteJobDescriptionMaster?ID=" + ID);
  }


  public InsertJobDescriptionMaster(data: any) {
    debugger;
    this.url = this.host + '/Vendor/InsertJobDescriptionMaster';
    return this.http.post(this.url, data);
  }


  public UpdateJobDescriptionMaster(data: any) {
    debugger
    this.url = this.host + "/Vendor/UpdateJobDescriptionMaster";
    return this.http.post(this.url, data);
  }

  public InsertManpowerPlanningandBudgeting(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertManpowerPlanningandBudgeting';
    return this.http.post(this.url, data);
  }



  public UpdateManpowerPlanningandBudgeting(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateManpowerPlanningandBudgeting';
    return this.http.post(this.url, data);
  }

  public GetManpowerPlanningandBudgeting() {

    return this.http.get<any[]>(this.host + "/Announcement/GetManpowerPlanningandBudgeting");
  }

  public DeleteManpowerPlanningandBudgeting(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteManpowerPlanningandBudgeting?ID=" + ID);
  }

  public UpdateSupportTickets(data: any) {
    debugger;
    this.url = this.host1 + '/Master/UpdateSupportTickets';
    return this.http.post(this.url, data);
  }

  public UpdateJobRequirementStatus(data: any) {
    debugger;
    this.url = this.host + '/User/UpdateJobRequirementStatus';
    return this.http.post(this.url, data);

  }

  public UpdateCanditateBudgetStatus(data: any) {
    debugger;
    this.url = this.host + '/Vendor/UpdateCanditateBudgetStatus';
    return this.http.post(this.url, data);
  }


  public InsertExceptionLogs(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertExceptionLogs';
    return this.http.post(this.url, data);

  }

  public GetExceptionLogs() {
    return this.http.get<any[]>(
      this.host + "/Master/GetExceptionLogs"

    );
  }

  public GetClosedJobRequirement() {
    return this.http.get<any[]>(this.host + "/Master/GetClosedJobRequirement");
  }


  public sendemailattachements(data: any) {
    debugger
    this.url = this.host + '/Master/sendemailattachements';
    return this.http.post(this.url, data)
  }

  public sendemailattachementsforemail(data: any) {
    debugger
    this.url = '  https://asticom.digiofficeapp.com/AsticomMainAPI' + '/Master/sendemailattachements';
    return this.http.post(this.url, data)
  }


  public ClearNotificationByID(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/ClearNotificationByID?ID=" + ID);
  }


  public GetNotification(UserID: any) {
    return this.http.get<any[]>(
      this.host + "/User/GetNotification?UserID=" + UserID
    );
  }


  public UpdateNotificationSeen(ID: any) {
    return this.http.get<any[]>(
    this.host + "/Master/UpdateNotificationSeen?ID=" + ID
      // this.host + "/Master/UpdateNotificationSeen?ID=" + ID
      );
  }


  public UpdateCandidateRegistration(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateCandidateRegistration';
    return this.http.post(this.url, data);
  }

 








  
  public InsertNotificationSBU(Event: any, ToUser: any, Message: any,) {
    debugger
    var entity = {
      'Date': new Date(),
      'Event': Event,
      'FromUser': 'Admin',
      'ToUser':sessionStorage.getItem('userid'),  
      'Message': Message,
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID':ToUser ,
      'NotificationTypeID': 3,
      'VendorID': 0
    }
    this.url = this.host + '/User/InsertNotification/';
    return this.http.post(this.url, entity);
  }



  public InsertLevelMaster(data: any) {
    debugger;
    this.url = this.host + '/Vendor/InsertLevelMaster';
    return this.http.post(this.url, data);
  }


  public GetLevelMaster() {

    return this.http.get<any[]>(this.host + "/Vendor/GetLevelMaster");
  }


}
