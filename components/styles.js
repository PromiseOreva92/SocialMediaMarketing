import styled from 'styled-components';
import Constants from "expo-constants";
import {View, Text, Image, TextInput,TouchableOpacity} from 'react-native';

const StatusBarHeight = Constants.statusBarHeight;
export const Colors = {
    primary:"#ffffff",
    secondary:"#4075C4",
    lightSecondary: "rgba(1,100,204,0.5)",
    tertiary:"#4075C4",
    darkLight:"blue",
    brand:"#4075C4",
    green:"green",
    red:"red",
    white:"#ffffff",
    lineColor:"#cccccc",
    profileLine:"#E3E9ED",
    paystack:"#011B33",
    black:"#000000",
    errortext:'red'
};
const {primary,secondary,tertiary,darkLight,brand,green,red} = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 10}px ;
    background-color: ${primary};

`;

export const InnerContainer = styled.View`
    flex:1;
    width:100%;
    align-item: center;
`;

export const LogoContainer = styled.View`
    width:100%;
    text-align:center;


`

export const PageLogo = styled.Image`
    height:80px;
    width:80px;
    margin-top:10%;
    margin-horizontal:40%;
`;


export const PageTitle = styled.Text`
    font-size:30px;
    text-align:center;
    font-weight:bold;
    color: ${brand};
    padding:10px;
`;

export const SubTitle = styled.Text`
    font-size:18px;
    margin-bottom:20px;
    letter-spacing:1px;
    font-weight:bold;
    text-align:center;
    color: ${tertiary};
`;

export const StyledFormArea = styled.View`
    width:100%;
`;

export const StyledTextInput = styled.TextInput`
    border:1px solid ${secondary};
    padding:10px;
    padding-left:55px;
    padding-right:55px;
    border-radius:5px;  
    font-size:16px;
    font-weight:bold;
    margin-vertical:3px;
    margin-bottom:10px;
    color:${tertiary};

`;



export const StyledInputLabel= styled.Text`
    color:${tertiary};
    font-size:13px;
    text-align:left;
     
`;

 export const LeftIcon = styled.View`
    left:15px;
    top:33px;
    position:absolute;
    z-index:1;
 `;

 export const RightIcon = styled.TouchableOpacity`
    right:15px;
    top:33px;
    position:absolute;
    z-index:1;
`;

export const StyledButton = styled.TouchableOpacity`
padding:15px;
background-color:${brand};
justify-content:center;
border-radius:5px;
align-items:center;
margin-vertical:5px;


`;


export const ButtonText = styled.Text`
color:${primary};
text-transform:uppercase;
font-size:16px;
font-weight:bold;
`;

export const MsgBox = styled.Text`
    text-align:center;
    font-size:14px;
    font-weight:bold;
    margin-vertical:5px;
    color:${Colors.red};
    

`

export const UrlMsg = styled.Text`
    text-align:center;
    font-size:14px;
    margin-vertical:5px;
    color:${Colors.red};
    

`

export const QtyMsg = styled.Text`
    text-align:center;
    font-size:14px;
    color:${Colors.red};
    

`


 
export const Line = styled.View`
    width:100%;
    height:1px;
    background-color:${Colors.secondary};
    margin-vertical:10px;
`




export const ExtraView = styled.View`
    flex-direction:row;
    align-content:center;
    padding:5px;
`

export const ExtraText = styled.Text`
    justify-content:center;
    align-content:center;
    color:${tertiary};
    font-size:16px;
    font-weight:bold;


`

export const TextLink = styled.TouchableOpacity`
    justify-content:center;
    align-item:center;
`

export const TextLinkContent = styled.Text`
    color:${brand};
    font-weight:bold;
    font-size:15px;   
`


export const PageContainer = styled.View`
    flex: 1;
    background-color: ${primary};
    padding-horizontal:8px;
    padding-top:40px;

`;
export const Header = styled.View`
    width:100%;
`;

export const Nav = styled.View`
    width:100%;
    background-color:${Colors.primary};
    padding-top:40px;
    padding-bottom:15px;
    padding-horizontal:10px;
    flex-direction:row;
`;

export const BackButton = styled.TouchableOpacity`

background-color:none;
margin-horizontal:10px;
text-align:center;
width:15%;
`;

export const NavTitle = styled.Text`
font-size:18px;
font-weight:bold;
text-align:center;
color:${secondary};
`;





export const Greeting = styled.View`
    width:80%;
`;

export const GreetingText = styled.Text`
    color:${Colors.primary};
    font-size:18px;
    font-weight:bold;
`;

export const Summary = styled.View`
background-color:${Colors.secondary};
padding:10px;
border-radius:5px;
box-shadow:#000000 3px 3px 3px;
`;

export const Offset = styled.View`
background-color:${Colors.secondary};
position:relative;
top:-9px;
border-radius:5px;
padding:10px;
margin-horizontal:10px;
`;



export const Balance = styled.Text`
color:${Colors.primary};
font-size:36px;
font-weight:bold;
text-align:center;
`;
export const BalanceLabel = styled.Text`
margin-top:40px;
color:${Colors.primary};
font-size:14px;
text-align:center;
`;
export const ButtonContainer = styled.View`
width:100%;
padding:10px;
justify-content:center;
flex-direction:row;

`;

export const AddNaira = styled.TouchableOpacity`

padding:12px;
background-color:none;
border:1px solid ${primary};
margin-horizontal:10px;
justify-content:center;
border-radius:10px;
align-items:center;
margin-vertical:5px;
width:45%;
`;

export const OtherCurrency = styled.TouchableOpacity`

padding:5px;
background-color:none;
border:1px solid ${primary};
justify-content:center;
border-radius:10px;
align-items:center;
margin-vertical:5px;
width:45%;

`;

export const BtnText = styled.Text`
color:${primary};
text-transform:uppercase;
font-size:12px;
font-weight:bold;
`;
export const SocialContainer = styled.TouchableOpacity`
    width:100%;
    padding:5px;
    flex-direction:row;
`;
export const SocialLogo = styled.Image`
    width:40px;
    height:40px;
`;

export const ServiceLogo = styled.Image`
    width:30px;
    height:30px;
`;

export const SocialLogoContainer = styled.View`
width:15%;
`;

export const ServiceLogoContainer = styled.View`
width:10%;
`;

export const SocialLabel = styled.View`
width:80%;
flex-direction:column;
`;

export const SocialTitle = styled.Text`
font-size:18px;
font-weight:bold;
margin-vertical:10px;
`;

export const SocialTag = styled.View`
width:100%;
`;
export const SocialTagText = styled.Text`
font-weight:bold;
`;

export const SocialWriter = styled.Text`

`;

export const SocialLine = styled.View`
    width:100%;
    height:1px;
    background-color:${Colors.lineColor};
    margin-vertical:5px;
`;
export const SeeOthers = styled.TouchableOpacity`
width:100%;
`;
export const SeeOthersText = styled.Text`
color:${Colors.secondary};
font-weight:bold;
font-size:16px;
margin-horizontal:20px;
margin-vertical:10px;
`;

export const OrderButton = styled.TouchableOpacity`
padding:12px;
box-shadow:#ccc 3px 3px 3px;
background-color:${secondary};
justify-content:center;
border-radius:20px;
align-items:center;
margin-vertical:5px;
margin-horizontal: 20%;
`;

export const OrderButtonText = styled.Text`
    color:${Colors.primary};
    font-weight:bold;
`;
export const CartEmptyLogoContainer = styled.View`
width:100%;
margin-top:20px;
justify-content:center;
align-items:center;

`;
export const CartEmptyLogo = styled.Image`

`;

export const NotificationBox = styled.View`
width:100%;
align-items:center;
`;
export const NotificationText = styled.Text`
margin-vertical:10px;
font-size:18px;
font-weight:bold;
`;



export const Card = styled.View`
width:100%;
margin-horizontal:20px;
margin-vertical:10px;
background-color:${Colors.primary};
border-radius:20px;
padding:20px;
`;

export const ProfileCardContainer = styled.View`
width:100%;
flex-direction:row;
`;

export const ProfileCardLogoContainer = styled.View`
width:20%;
`;

export const ProfileCardBioContainer = styled.View`
width:90%;
flex-direction:column;
`;

export const ProfileCardFullName = styled.Text`
width:100%;
margin-top:10px;
font-size:16px;
font-weight:bold;
`;

export const ProfileCardEmail = styled.Text`
width:100%;
font-size:12px;
`;

export const Photo = styled.Image`
    width:50px;
    height:50px;
`;

export const MenuItem = styled.TouchableOpacity`
    flex-direction:row;
    width:100%;
`;

export const MenuText = styled.Text`
width:90%;
font-weight:bold;
`;

export const MenuLine = styled.View`
    width:100%;
    height:1px;
    background-color:${Colors.profileLine};
    margin-vertical:10px;
`;

export const Logout = styled.TouchableOpacity`
    width:100%;
    text-align:center;
    color:${Colors.secondary};

`;

export const LogoutText = styled.Text`
    width:100%;
    text-align:center;
    color:${Colors.secondary};
    font-weight:bold;

`;
export const PersonalTextInput = styled.TextInput`
    background-color:${Colors.primary};
    padding:10px;
    padding-left:55px;
    padding-right:55px;
    border-radius:25px;  
    font-size:14px;
    margin-vertical:5px;
    margin-bottom:10px;
    color:${tertiary};
    

`;

export const LeftPersonalIcon = styled.View`
left:15px;
top:20px;
position:absolute;
z-index:1;
`;

export const RightPersonalIcon = styled.TouchableOpacity`
right:15px;
top:20px;
position:absolute;
z-index:1;
`;

export const PersonalButton = styled.TouchableOpacity`
padding:12px;
background-color:${brand};

justify-content:center;
border-radius:20px;
align-items:center;
margin-vertical:5px;

`;

export const PaystackBanner = styled.TouchableOpacity`
    background:#F1FEF4;
    border-radius:10px;
    padding:10px;
    margin-horizontal:5px;
    border:1px solid ${Colors.lineColor};
`;

export const PaystackLogoContainer = styled.View`
    margin-top:10px;
`;

export const PaystackLogo = styled.Image`

`;

export const PaystackInfo = styled.Text`
color: ${Colors.paystack};
font-weight:bold;
width:100%;
font-size:14px;
margin-vertical:10px;
`;

export const BankBanner = styled.View`
padding:15px;
margin-vertical:20px;
background-color:${Colors.secondary};
border-radius:5px;
margin-horizontal:5px;
`;

export const BankAccountDetails = styled.View`

`;

export const BankAccount = styled.Text`
    color:${Colors.primary};
    font-weight:bold;
`;

export const BankInfo = styled.Text`
    color:${Colors.primary};
    font-weight:bold;
    
`;

export const CopyButton = styled.TouchableOpacity`
padding:10px;
background-color:none;
border:1px solid ${primary};
justify-content:center;
border-radius:5px;
align-items:center;
margin-vertical:5px;
width:30%;
`;

export const CopyButtonText = styled.Text`
color:${primary};
font-weight:bold;
`;

export const ServiceCard = styled.TouchableOpacity`
    width:30%;
    margin-vertical:10px;
    background-color:${Colors.lineColor};
    margin-horizontal:5px;
    padding:15px;
    border-radius:5px; 
    background-color: ${primary};

`;

export const ServiceLogoBox = styled.View`
    justify-content:center;
`;

export const ServiceContainer = styled.View`
    width:100%;
    padding:5px;
    flex-direction:row;
    justify-content:center;

`;
export const ServiceText = styled.Text`
    text-align:center;
    font-weight:bold;

`;

export const ServicePage = styled.View`
    text-align:center;
    font-weight:bold;

`;

export const ServiceTitle = styled.Text`
font-size:18px;
font-weight:bold;
margin-vertical:10px;
text-align:center;
color:${secondary};
`;

export const DropdownButton = styled.TouchableOpacity`
    border:1px solid ${secondary};
    padding:15px;
    padding-left:55px;
    padding-right:55px;
    border-radius:5px;  
    font-size:14px;
    margin-vertical:3px;
    margin-bottom:10px;
    color:${tertiary};

`;


export const DropdownList = styled.View`
  position: absolute;
  z-index:100;
  top: 40px;
  width: 100%;
  background-color:${Colors.primary};
  border: 1px solid ${secondary};
  border-radius: 5px;
`;

export const DropdownItem = styled.TouchableOpacity`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color:${Colors.primary}
`;

export const DropdownText = styled.Text`
    color:${tertiary};
    font-size:16px;
    font-weight:bold;
    background-color:${Colors.primary}
    
`;




export const ServiceView = styled.View`
flex-direction:row;
width:100%;
`
export const ServiceViewLogoBox = styled.View`
width:10%;
`;
export const ServiceViewLogo = styled.Image`
    width:30px;
    height:30px;
`;
export const ServiceNameBox = styled.View`
width:90%;
flex-direction:column;
`;
export const ServiceName = styled.Text`
    font-weight:bold;
    font-size:14px;
    color:${Colors.secondary};
`;

export const ServiceMinimum = styled.Text`

    font-size:12px;
`;

export const ServicePriceText = styled.Text`
    font-weight:bold;
    margin-top:3px;
`
export const ServicePrice = styled.View`
width:20%;
`;

export const CategoryView = styled.View`
flex-direction:row;
width:100%;
`
export const CategoryViewLogoBox = styled.View`
width:10%;
`;
export const CategoryViewLogo = styled.Image`
    width:30px;
    height:30px;
`;
export const CategoryNameBox = styled.View`
width:90%;
flex-direction:column;
`;
export const CategoryName = styled.Text`
    font-weight:bold;
    font-size:14px;
    color:${Colors.secondary};
`;



export const KycTitle = styled.Text`
font-size:18px;
font-weight:bold;
margin-vertical:10px;
text-align:center;
color:${secondary};
`;

export const PurchaseTitle = styled.Text`
font-size:18px;
font-weight:bold;
margin-vertical:10px;
text-align:center;
color:${secondary};
`;


export const OrderContainer = styled.View`

`;



export const OrderNameBox = styled.View`
width:90%;
flex-direction:column;
`;
export const OrderName = styled.Text`
    font-weight:bold;
    margin-vertical:2px;
    color:${Colors.secondary};
    font-size:14px;
`;

export const OrderQuantity = styled.Text`
    font-size:12px;
    color:${Colors.secondary};
`;
 

export const DetailBox = styled.View`
    width:100%;
    flex-direction:column;
    padding:5px;
`;

export const Subject = styled.Text`
    font-weight:bold;
    color:${Colors.secondary};
`;

export const Details = styled.Text`
    font-size:14px;
    padding:3px;
    color:${Colors.secondary};
`;

export const DetailsAmount = styled.Text`
    font-size:36px;
    font-weight:bold; 
    color:${Colors.secondary};
`;

export const DetailsContainer = styled.View`
    flex:1;
    padding-horizontal:20px;
`;

export const DetailsCard = styled.View`
width:100%;
margin-vertical:5px;
background-color:${Colors.primary};
border-radius:10px;
padding:10px;
`;

export const Status = styled.Text`
border:1px solid ${Colors.secondary};
padding:10px;
border-radius:20px;
font-weight:bold; 
text-align:center;
color:${Colors.primary};
background-color:${Colors.secondary};
`


export const ServiceEmptyNotice = styled.View`
flex:1;
justifyContent: center;
alignItems: center

`



