import { TablePaginationConfig } from "antd";
import { LocaleComponentName } from "antd/es/locale/useLocale";
import { FilterValue } from "antd/es/table/interface";
 
export interface User {
    key: React.Key;
    id: string;
    email: string;
    ur_no: number;
    unitName: string;
    personNo: bigint;
    personName: string;
    personPosition: string;
    lastLogin: Date;
    user_state: boolean;
    passChange: boolean;
    rankId: number;
    rankName: string;
    cisco: bigint;
    created_date: Date;
    created_by: string;
    updated_date: Date;
    updated_by: string;
    seenUpdate: boolean;
    passChangeDate: Date;
    closedAccountFlag: number;
    lockoutEnabled:boolean,
    closedBy: string;
    hrTest: boolean;
    roleWithUserDto: Role[];
    unitUser: number[];
}
export interface AddUser {
    id: string;
    email: string;
    ur_no: number;
    personNo: bigint;
    personName: string;
    personPosition: string;
    user_state: boolean;
    rankId: number;
    cisco: bigint;
    hrTest: boolean;
    roleWithUserDto: Role[];
    unitUser: number[];
    
}
 
export interface Role {
    roleId: string;
    roleName: string;
    roleNameAR: string;
    isSelected: boolean;
}

 
export interface IRules {
    allowedRules: string[];
}
 
export interface LoginDto {
    email: string;
    password: string;
    rememberMe: boolean;
} 
export interface resetPass {
  
    token:string,
newPassword: string;
confirmPassword: string;
}
export interface RegisterUserDto {
    email: string;
    password: string;
    personName: boolean;
}
export interface ILoginResponse {
    token: string;
    expiration: Date,
    refresh_token: string,
    refresh_token_expiry: Date,
    message: string,
    loginStatus: boolean,
    passwordChange: boolean,
    userRoles: string[];
    basicUserInfo: IbasicUserInfo
}
export interface IbasicUserInfo {
    userName: string;

}
export interface IAuth {
    loginResponse: ILoginResponse;
    loading: boolean;
    messegeError:string

}
export interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
}
export interface ModalState {
    isOpen: boolean,
    postState: boolean,
    Width: number,
    title: string,
    content: LocaleComponentName,
    modalIcon: LocaleComponentName,
    loading: boolean,
    
}
 
 

export interface SpiUnitDTO {
    id: number,
    id1: number,
    ur_no: number,
    sort: number,
    active: boolean,
    color: string,
    bgColor: string,
    canAdd: boolean,
    name: string | null,
    nameEn: string | null,
 
}

export interface SubMangeMinistrysDto {
   
   
    id: number,
    name: string,
    nameEn: string,
    position: string,
    positionEn: string,
     
    rankName: string | null,
    ruleOfficerMinistryId:number,
    ruleOfficerMinistryName:string,
    ruleOfficerMinistryNameEn:string,
    rankId: number,
    from: Date,
    to: Date,
    sort: number,
    active: boolean,
    
}
export interface IChart {
    
    id: number,
    year: number,
    userGain: number,
    userLost: number,
}
export interface IChartDataSet {

    labels: number[],
    datasets: IcData[],
   
}
export interface IcData {

    label: string,
    data: number[],
    backgroundColor: string[],
    borderColor:string,
    borderWidth:number

}   
export interface TargetDto  {
 
    id: number,
    name: string ,
    nameEn: string ,
    sort: number,
    active: boolean,
    moshtrak: boolean,
    year: number,
    mainTarget: boolean,
    perentTargetId: number |null,
    targetScorr: number,
    subTargets: TargetDto[] 

}
export interface TargetScorrDto {
        mainTargetScorr :number,
            sumSubTargetScorr :number
    }
export interface Images{
 
    id: number,
    image: File|null,
    imageFileName: string|null,
    userId: string,
    userName: string,
    unitName:string,
    name: string,
    sort: number,
    description: string,
    descriptionEn: string,
    createdDate :Date,
    color: string,
}
export interface ImagesDto {

    id: number,
    image: File | null,
    userId: string,
    userName: string,
    unitName: string,
    createdDate: Date,
    name: string,
    nameEn: string,
    sort: number,
    description: string,
    descriptionEn: string,
    color: string,
}
export interface SpniPdf{
    id1: number,
    id: number,
    name: string,
    nameEn: string,
    pdfFileName: string,
    pdf: File | null,
    sort: number,
    description: string
    descriptionEn: string
    color:string,
}
export interface SpniPdfDto{
    
    id: number,
    name: string,
    nameEn: string,
    pdfFileName: string,
    pdf:string,
    sort: number,
    description: string
    descriptionEn: string
    color:string,
}

export interface OfficerInfoDto {
 
    id: number,
    name: string,
    nameEn: string,
    position: string,
    positionEn: string,
    sort: number,
    countryName: string | null,
    countryNameEn: string | null,
    active:boolean,
    rankName: string | null,
    rankNameEn: string | null,
     countryId: number,
     rankId: number,
    from: Date,
    ruleOfficerMinistryId:number,
    ruleOfficerMinistryName:string,
    ruleOfficerMinistryNameEn:string,
     to: Date,
}

export interface RankList {
     label: string,
    labelEn: string,
    value: number,
}
export interface CountryList {
    label: string,
    labelEn: string,
    value: number,
}
export interface OfficerInfoDtoSp {
    ranks: RankList[],
    country: CountryList[],
    rule: RuleList[],
    record: OfficerInfoDto
}
export interface SubMangeMinistryDtoSp  {
    ranks: RankList[],
    rule: RuleList[],
    record: SubMangeMinistrysDto

}
export interface RuleList {
    value: number,
    label: string,
    labelEn: string,
}
export interface SpiUnitAutoComplete {
    key: number,
   value : number,
}
 
export interface SpiUnitSp {
    units: SpiUnitAutoComplete[],
    record: SpiUnitDTO
}
 

export interface SpiAttitudeDto {
    id1: number,
    id: number,
    targetId: number,
    officerInfoId: number,
    manageMinistryId: number,
    targetName: string,
    targetNameEn:string,
    officerName: string,
    officerNameEn: string,
    manageMinistryName: string,
    manageMinistryNameEn: string,
    follow: string,
    followEn: string,
    actionTaken: string,
    actionTakenEn: string,
    suggistion: string,
    suggistionEn: string,
    resolution: string,
    resolutionEn: string,
    year:number,
    isTrue:boolean
    mujmal: boolean
    startDateToComplete: Date,
    endDateToComplete: Date,
    targetScorr: number,
    rateComplete:number,
    isComplete :boolean,
    endNotComplete: boolean,
    targetSort: number,
    subSpiAttitude:SpiAttitudeDto[]
}
 
export interface TargetList {
    label: string,
    labelEn: string,
    value: number,
    
}
export interface OfficerList {
    label: string,
    labelEn: string,
    value: number,
}
export interface ManageMinistryList {
    label: string,
    labelEn: string,
    value: number,
    
}

export interface YearList {
    label: string,
    labelEn: string,
    value: number,
}

export interface SpiAttitudeDtoSp {
 
    officers: OfficerList[],
    manageministrys: ManageMinistryList[],
    record: SpiAttitudeDto
}
export interface NewsDto {
    id1: number;
    id: number;
    applicationUserId: string; 
    details: string; 
    detailsEn: string; 
    can: boolean;
    canAll: boolean;
}
export interface TargetsMangeMinistryDto {
    id: number,
    mangeMinistryId: number,
    mangeMinistryName:string,
    mangeMinistryNameEn:string,
    targetsMangeMinistryList: TargetsListDto[];
    targetsList: number[];
}
export interface TargetsListDto {
    label: string,
    labelEn: string,
    value: number,

}
export interface ITransilation {
    text: string | null,
    sl: string | "ar",
    tl:string|"en"
}
export const TransInitailValue: ITransilation = {
    text: "",
    sl:  "ar",
    tl:  "en"
}