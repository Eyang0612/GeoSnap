import { useState } from 'react';
import { Button, TextField, Typography, Box, Collapse, Alert, IconButton, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import FormSelects from './UploadForm';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

import myBackgroundImage from '../../assets/OceanBlob.png';


const UploadForm = () => {
    const history = useNavigate();
    const countryDataBase = Country.getAllCountries();




    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [description, setDescription] = useState('');
    const [countryIso, setCountryIso] = useState('');
    const [stateIso, setStateIso] = useState('');
    const [city, setCity] = useState('');
    const [dataValid, setDataValidity] = useState(false);
    const [warningText, setWarningText] = useState("");
    const [loading, setLoading] = useState(false);
 

    const style = {
        position: 'relative',
        margin: 4,
        width: '80%',
    
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const findCountryIso = (countryName) => {
        for (let i = 0; i < countryDataBase.length; i++) {
            if (countryDataBase[i].name.toLowerCase() === countryName.toLowerCase()) {
                return countryDataBase[i].isoCode;
            }
        }
        return "";

    }

    const findStateIso = (stateName, countryIso) => {
        const stateDataBase = State.getStatesOfCountry(countryIso)

        for (let i = 0; i < stateDataBase.length; i++) {
            if (stateDataBase[i].name.toLowerCase() === stateName.toLowerCase()) {
                return stateDataBase[i].isoCode;
            }
        }
        return "";

    }

    const findCityLocation = (cityName, stateIso, countryIso) => {
        const cityDataBase = City.getCitiesOfState(countryIso, stateIso)

        for (let i = 0; i < cityDataBase.length; i++) {
            if (cityDataBase[i].name.toLowerCase() === cityName.toLowerCase()) {
                return [cityDataBase[i].latitude, cityDataBase[i].longitude];
            }
        }
        return ["",""];

    }


    const handleImageChange = (event) => {
        console.log(event);
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            // Reset the image and preview URL if no file is selected
            setImage(null);
            setPreviewUrl(null);
            
            
        }
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        
        setLoading(true);
        if(image === null){
            setDataValidity(true);
            setWarningText("Error: Image Required");
            setLoading(false);
            return
        }else{
            setDataValidity(false)
            
        }
        

        const cloudName = import.meta.env.VITE_CLOUD_NAME; // Replace with your Cloudinary cloud name
        const uploadPreset = import.meta.env.VITE_CLOUD_PRESENT; // Replace with your unsigned upload preset

        const cloudinaryForm = new FormData();
        cloudinaryForm.append("file", image);
        cloudinaryForm.append("upload_preset", uploadPreset);



        try {

            const cloudResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: cloudinaryForm
            });
            if (!cloudResponse.ok) {
                const errorData = await cloudResponse.json();
                console.error('Upload Error:', errorData);
                // Display an error message to the user
                setLoading(false);
                return;
            }

            const data = await cloudResponse.json();

            const headers = { "Content-Type": "application/json" };
            // The URL of the uploaded image
            const imageUrl = data.secure_url;
            

            const url = "https://picarta.ai/classify";
            const payload = {
                TOKEN: import.meta.env.VITE_PIC_TOKEN,
                IMAGE: `${imageUrl}`
            };
            

            const formData = {
                imageUrl: imageUrl,
                userId: window.localStorage.getItem('id'),
                countryIso: "",
                stateIso: "",
                city: "",
                latitude: "",
                longitude: "",
                description: description
            };




            if (countryIso === '') {
                const picartaResponse = await fetch(url, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(payload)
                })
                const data = await picartaResponse.json()
                console.log(data);
                formData.countryIso = findCountryIso(data.ai_country);
                if (formData.countryIso === "") {
                    setLoading(false);
                    throw new Error("Country isoCode not found!");
                }
                formData.stateIso = findStateIso(data.province, formData.countryIso);
                if (formData.stateIso === "") {
                    setLoading(false);
                    throw new Error("State isoCode not found!");
                }
                formData.city = data.city;
                formData.latitude = data.ai_lat;
                formData.longitude = data.ai_lon;
            } else if (stateIso === '') {
                formData.countryIso = countryIso;
                const countryInfo = Country.getCountryByCode(countryIso)
                formData.latitude = countryInfo.latitude;
                formData.longitude = countryInfo.longitude;
            }else if (city === ''){
                formData.countryIso = countryIso;
                formData.stateIso = stateIso;
                const countryStateData = State.getStateByCodeAndCountry(stateIso, countryIso);
                formData.latitude = countryStateData.latitude;
                formData.longitude = countryStateData.longitude;
            }else{
                formData.countryIso = countryIso;
                formData.stateIso = stateIso;
                formData.city = city;
                const cityData = findCityLocation(city,stateIso,countryIso);
                formData.latitude = cityData[0];
                formData.longitude = cityData[1];
            }
            
            const response = await axios.post(`http://${import.meta.env.VITE_BACKEND_URI||'localhost:3000'}/images`, formData);
            history('/user');


            // Handle success (redirect, show message, etc.)
        } catch (error) {
            console.error('Error submitting:', error);
            setDataValidity(true);
            setWarningText('Error submitting: Something Went Wrong!');
            setLoading(false);

        }
       
    };

    return (
        
        <Box 
        sx={{
                display:'flex',
                width: '100%',
                minHeight: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `url('data:image/svg+xml,<svg width="100%" height="100%" id="svg" viewBox="0 0 1440 690" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><style> .path-0{ animation:pathAnim-0 4s; animation-timing-function: linear; animation-iteration-count: infinite; } @keyframes pathAnim-0{ 0%{ d: path("M 0,700 L 0,105 C 73.69632428718654,124.2009618687736 147.39264857437308,143.4019237375472 209,150 C 270.6073514256269,156.5980762624528 320.12572998969426,150.59326691858467 378,150 C 435.87427001030574,149.40673308141533 502.10443146684986,154.22500858811406 581,152 C 659.8955685331501,149.77499141188594 751.4565441429062,140.50669872895912 830,145 C 908.5434558570938,149.49330127104088 974.0693919615253,167.74819649604947 1038,153 C 1101.9306080384747,138.25180350395053 1164.2658880109927,90.50051528684301 1231,77 C 1297.7341119890073,63.49948471315699 1368.8670559945035,84.2497423565785 1440,105 L 1440,700 L 0,700 Z"); } 25%{ d: path("M 0,700 L 0,105 C 69.11301958090004,120.6612847818619 138.2260391618001,136.3225695637238 197,130 C 255.7739608381999,123.6774304362762 304.2088629336998,95.3710065269667 373,97 C 441.7911370663002,98.6289934730333 530.938509103401,130.19340432840949 610,125 C 689.061490896599,119.80659567159053 758.0371006526966,77.85537615939539 825,75 C 891.9628993473034,72.14462384060461 956.9130882858124,108.38509103400895 1029,121 C 1101.0869117141876,133.61490896599105 1180.3105462040535,122.60425970456888 1250,116 C 1319.6894537959465,109.39574029543112 1379.8447268979733,107.19787014771556 1440,105 L 1440,700 L 0,700 Z"); } 50%{ d: path("M 0,700 L 0,105 C 47.555479216763985,97.37512882171075 95.11095843352797,89.7502576434215 172,86 C 248.88904156647203,82.2497423565785 355.1116454826521,82.37409824802474 436,84 C 516.8883545173479,85.62590175197526 572.4424596358638,88.75334936447956 624,94 C 675.5575403641362,99.24665063552044 723.1185159738923,106.612504294057 790,118 C 856.8814840261077,129.387495705943 943.0834764685674,144.79663345929237 1023,149 C 1102.9165235314326,153.20336654070763 1176.547578151838,146.20096186877362 1245,137 C 1313.452421848162,127.79903813122638 1376.726210924081,116.39951906561319 1440,105 L 1440,700 L 0,700 Z"); } 75%{ d: path("M 0,700 L 0,105 C 54.27069735486086,121.06458261765717 108.54139470972171,137.12916523531433 189,134 C 269.4586052902783,130.87083476468567 376.1051185159739,108.54792167639987 447,99 C 517.8948814840261,89.45207832360013 553.0381312263828,92.67914805908623 614,98 C 674.9618687736172,103.32085194091377 761.7423565784952,110.73548608725525 827,109 C 892.2576434215048,107.26451391274475 935.9924424596361,96.3789075918928 995,101 C 1054.007557540364,105.6210924081072 1128.287873582961,125.7488835451735 1205,129 C 1281.712126417039,132.2511164548265 1360.8560632085196,118.62555822741325 1440,105 L 1440,700 L 0,700 Z"); } 100%{ d: path("M 0,700 L 0,105 C 73.69632428718654,124.2009618687736 147.39264857437308,143.4019237375472 209,150 C 270.6073514256269,156.5980762624528 320.12572998969426,150.59326691858467 378,150 C 435.87427001030574,149.40673308141533 502.10443146684986,154.22500858811406 581,152 C 659.8955685331501,149.77499141188594 751.4565441429062,140.50669872895912 830,145 C 908.5434558570938,149.49330127104088 974.0693919615253,167.74819649604947 1038,153 C 1101.9306080384747,138.25180350395053 1164.2658880109927,90.50051528684301 1231,77 C 1297.7341119890073,63.49948471315699 1368.8670559945035,84.2497423565785 1440,105 L 1440,700 L 0,700 Z"); } }</style><defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stop-color="%23F78DA7"></stop><stop offset="95%" stop-color="%238ED1FC"></stop></linearGradient></defs><path d="M 0,700 L 0,105 C 73.69632428718654,124.2009618687736 147.39264857437308,143.4019237375472 209,150 C 270.6073514256269,156.5980762624528 320.12572998969426,150.59326691858467 378,150 C 435.87427001030574,149.40673308141533 502.10443146684986,154.22500858811406 581,152 C 659.8955685331501,149.77499141188594 751.4565441429062,140.50669872895912 830,145 C 908.5434558570938,149.49330127104088 974.0693919615253,167.74819649604947 1038,153 C 1101.9306080384747,138.25180350395053 1164.2658880109927,90.50051528684301 1231,77 C 1297.7341119890073,63.49948471315699 1368.8670559945035,84.2497423565785 1440,105 L 1440,700 L 0,700 Z" stroke="none" stroke-width="0" fill="url(%23gradient)" fill-opacity="0.265" class="transition-all duration-300 ease-in-out delay-150 path-0"></path><style> .path-1{ animation:pathAnim-1 4s; animation-timing-function: linear; animation-iteration-count: infinite; } @keyframes pathAnim-1{ 0%{ d: path("M 0,700 L 0,245 C 62.806595671590514,227.99622122981793 125.61319134318103,210.99244245963587 192,221 C 258.38680865681897,231.00755754036413 328.35383029886634,268.02645139127446 393,269 C 457.64616970113366,269.97354860872554 516.9714874613535,234.90175197526625 600,228 C 683.0285125386465,221.09824802473375 789.7602198557196,242.3665407076606 850,239 C 910.2397801442804,235.6334592923394 923.987633115768,207.6320851940914 992,205 C 1060.012366884232,202.3679148059086 1182.289247681209,225.1051185159739 1266,236 C 1349.710752318791,246.8948814840261 1394.8553761593955,245.94744074201304 1440,245 L 1440,700 L 0,700 Z"); } 25%{ d: path("M 0,700 L 0,245 C 66.6341463414634,226.05805565097904 133.2682926829268,207.1161113019581 204,210 C 274.7317073170732,212.8838886980419 349.56097560975616,237.5936104431467 418,248 C 486.43902439024384,258.4063895568533 548.4878048780488,254.5094469254552 613,249 C 677.5121951219512,243.4905530745448 744.4878048780488,236.36860185503264 811,228 C 877.5121951219512,219.63139814496736 943.560975609756,210.01614565441432 1014,223 C 1084.439024390244,235.98385434558568 1159.2682926829268,271.5668155273102 1231,279 C 1302.7317073170732,286.4331844726898 1371.3658536585367,265.7165922363449 1440,245 L 1440,700 L 0,700 Z"); } 50%{ d: path("M 0,700 L 0,245 C 66.60872552387497,269.5091034008932 133.21745104774993,294.01820680178633 201,283 C 268.78254895225007,271.98179319821367 337.7389213328753,225.43627619374786 416,205 C 494.2610786671247,184.56372380625214 581.8268636207489,190.23668842322226 639,201 C 696.1731363792511,211.76331157677774 722.9536241841291,227.61697011336307 789,230 C 855.0463758158709,232.38302988663693 960.3586396427345,221.29543112332533 1036,214 C 1111.6413603572655,206.70456887667467 1157.611817244933,203.2013053933356 1220,209 C 1282.388182755067,214.7986946066644 1361.1940913775334,229.8993473033322 1440,245 L 1440,700 L 0,700 Z"); } 75%{ d: path("M 0,700 L 0,245 C 72.26657506011679,253.83132944005496 144.53315012023359,262.6626588801099 203,269 C 261.4668498797664,275.3373411198901 306.1339745791824,279.1806939196153 376,272 C 445.8660254208176,264.8193060803847 540.9309515630367,246.61456544142905 623,249 C 705.0690484369633,251.38543455857095 774.1422191686705,274.3610443146685 836,273 C 897.8577808313295,271.6389556853315 952.5001717622811,245.94125729989696 1027,239 C 1101.499828237719,232.05874270010304 1195.8570937822053,243.87392648574374 1268,248 C 1340.1429062177947,252.12607351425626 1390.0714531088975,248.56303675712815 1440,245 L 1440,700 L 0,700 Z"); } 100%{ d: path("M 0,700 L 0,245 C 62.806595671590514,227.99622122981793 125.61319134318103,210.99244245963587 192,221 C 258.38680865681897,231.00755754036413 328.35383029886634,268.02645139127446 393,269 C 457.64616970113366,269.97354860872554 516.9714874613535,234.90175197526625 600,228 C 683.0285125386465,221.09824802473375 789.7602198557196,242.3665407076606 850,239 C 910.2397801442804,235.6334592923394 923.987633115768,207.6320851940914 992,205 C 1060.012366884232,202.3679148059086 1182.289247681209,225.1051185159739 1266,236 C 1349.710752318791,246.8948814840261 1394.8553761593955,245.94744074201304 1440,245 L 1440,700 L 0,700 Z"); } }</style><defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stop-color="%23F78DA7"></stop><stop offset="95%" stop-color="%238ED1FC"></stop></linearGradient></defs><path d="M 0,700 L 0,245 C 62.806595671590514,227.99622122981793 125.61319134318103,210.99244245963587 192,221 C 258.38680865681897,231.00755754036413 328.35383029886634,268.02645139127446 393,269 C 457.64616970113366,269.97354860872554 516.9714874613535,234.90175197526625 600,228 C 683.0285125386465,221.09824802473375 789.7602198557196,242.3665407076606 850,239 C 910.2397801442804,235.6334592923394 923.987633115768,207.6320851940914 992,205 C 1060.012366884232,202.3679148059086 1182.289247681209,225.1051185159739 1266,236 C 1349.710752318791,246.8948814840261 1394.8553761593955,245.94744074201304 1440,245 L 1440,700 L 0,700 Z" stroke="none" stroke-width="0" fill="url(%23gradient)" fill-opacity="0.4" class="transition-all duration-300 ease-in-out delay-150 path-1"></path><style> .path-2{ animation:pathAnim-2 4s; animation-timing-function: linear; animation-iteration-count: infinite; } @keyframes pathAnim-2{ 0%{ d: path("M 0,700 L 0,385 C 63.38715218138097,401.0529027825489 126.77430436276194,417.1058055650979 194,412 C 261.22569563723806,406.8941944349021 332.2899347303333,380.6296805221573 416,363 C 499.7100652696667,345.3703194778427 596.0659567159051,336.37547234627283 654,346 C 711.9340432840949,355.62452765372717 731.446238406046,383.8684300927516 786,383 C 840.553761593954,382.1315699072484 930.1490896599107,352.15080728272073 1019,344 C 1107.8509103400893,335.84919271727927 1195.9574029543112,349.5283407763655 1266,360 C 1336.0425970456888,370.4716592236345 1388.0212985228445,377.7358296118173 1440,385 L 1440,700 L 0,700 Z"); } 25%{ d: path("M 0,700 L 0,385 C 59.73548608725525,372.35967021642045 119.4709721745105,359.7193404328409 195,354 C 270.5290278254895,348.2806595671591 361.8515973892132,349.4823084850567 441,348 C 520.1484026107868,346.5176915149433 587.1226382686363,342.3514256269323 644,361 C 700.8773617313637,379.6485743730677 747.6578495362418,421.11198900721405 803,427 C 858.3421504637582,432.88801099278595 922.2459635863966,403.2006183442116 993,402 C 1063.7540364136034,400.7993816557884 1141.3582961181723,428.08553761593953 1217,430 C 1292.6417038818277,431.91446238406047 1366.3208519409138,408.45723119203024 1440,385 L 1440,700 L 0,700 Z"); } 50%{ d: path("M 0,700 L 0,385 C 75.9890072140158,406.4634146341464 151.9780144280316,427.9268292682927 220,418 C 288.0219855719684,408.0731707317073 348.07694950188943,366.7560975609756 408,354 C 467.92305049811057,341.2439024390244 527.7141875644108,357.0487804878049 603,365 C 678.2858124355892,372.9512195121951 769.0663002404672,373.0487804878049 841,377 C 912.9336997595328,380.9512195121951 966.0206114737207,388.7560975609756 1032,379 C 1097.9793885262793,369.2439024390244 1176.8512538646512,341.9268292682927 1247,340 C 1317.1487461353488,338.0731707317073 1378.5743730676745,361.5365853658536 1440,385 L 1440,700 L 0,700 Z"); } 75%{ d: path("M 0,700 L 0,385 C 92.94950188938512,380.5671590518722 185.89900377877024,376.1343181037444 242,373 C 298.10099622122976,369.8656818962556 317.3534867743043,368.02988663689456 377,371 C 436.6465132256957,373.97011336310544 536.6870491240124,381.7461353486774 606,370 C 675.3129508759876,358.2538646513226 713.8983167296462,326.98557196839573 791,334 C 868.1016832703538,341.01442803160427 983.7196839574028,386.3115767777396 1060,387 C 1136.2803160425972,387.6884232222604 1173.222947440742,343.76812092064586 1230,336 C 1286.777052559258,328.23187907935414 1363.3885262796289,356.6159395396771 1440,385 L 1440,700 L 0,700 Z"); } 100%{ d: path("M 0,700 L 0,385 C 63.38715218138097,401.0529027825489 126.77430436276194,417.1058055650979 194,412 C 261.22569563723806,406.8941944349021 332.2899347303333,380.6296805221573 416,363 C 499.7100652696667,345.3703194778427 596.0659567159051,336.37547234627283 654,346 C 711.9340432840949,355.62452765372717 731.446238406046,383.8684300927516 786,383 C 840.553761593954,382.1315699072484 930.1490896599107,352.15080728272073 1019,344 C 1107.8509103400893,335.84919271727927 1195.9574029543112,349.5283407763655 1266,360 C 1336.0425970456888,370.4716592236345 1388.0212985228445,377.7358296118173 1440,385 L 1440,700 L 0,700 Z"); } }</style><defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stop-color="%23F78DA7"></stop><stop offset="95%" stop-color="%238ED1FC"></stop></linearGradient></defs><path d="M 0,700 L 0,385 C 63.38715218138097,401.0529027825489 126.77430436276194,417.1058055650979 194,412 C 261.22569563723806,406.8941944349021 332.2899347303333,380.6296805221573 416,363 C 499.7100652696667,345.3703194778427 596.0659567159051,336.37547234627283 654,346 C 711.9340432840949,355.62452765372717 731.446238406046,383.8684300927516 786,383 C 840.553761593954,382.1315699072484 930.1490896599107,352.15080728272073 1019,344 C 1107.8509103400893,335.84919271727927 1195.9574029543112,349.5283407763655 1266,360 C 1336.0425970456888,370.4716592236345 1388.0212985228445,377.7358296118173 1440,385 L 1440,700 L 0,700 Z" stroke="none" stroke-width="0" fill="url(%23gradient)" fill-opacity="0.53" class="transition-all duration-300 ease-in-out delay-150 path-2"></path><style> .path-3{ animation:pathAnim-3 4s; animation-timing-function: linear; animation-iteration-count: infinite; } @keyframes pathAnim-3{ 0%{ d: path("M 0,700 L 0,525 C 59.15286843009277,534.9924424596359 118.30573686018553,544.9848849192717 187,550 C 255.69426313981447,555.0151150807283 333.9299209893507,555.0529027825489 403,560 C 472.0700790106493,564.9470972174511 531.9745791824115,574.8035039505324 594,559 C 656.0254208175885,543.1964960494676 720.1717622810032,501.7330814153212 800,507 C 879.8282377189968,512.2669185846788 975.3383716935762,564.2641703881828 1042,559 C 1108.6616283064238,553.7358296118172 1146.4747509446925,491.21023703194777 1208,476 C 1269.5252490553075,460.78976296805223 1354.7626245276538,492.8948814840261 1440,525 L 1440,700 L 0,700 Z"); } 25%{ d: path("M 0,700 L 0,525 C 82.99416008244589,533.7007901064926 165.98832016489177,542.4015802129852 239,551 C 312.0116798351082,559.5984197870148 375.0408794228787,568.0944692545517 440,560 C 504.9591205771213,551.9055307454483 571.8481621435934,527.220542768808 640,512 C 708.1518378564066,496.779457231192 777.5664720027481,491.02335967021634 836,506 C 894.4335279972519,520.9766403297837 941.885949845414,556.6860185503264 1016,572 C 1090.114050154586,587.3139814496736 1190.889728615596,582.2325661284782 1266,571 C 1341.110271384404,559.7674338715218 1390.555135692202,542.383716935761 1440,525 L 1440,700 L 0,700 Z"); } 50%{ d: path("M 0,700 L 0,525 C 91.19409137753351,536.5939539677087 182.38818275506702,548.1879079354173 242,539 C 301.611817244933,529.8120920645827 329.64136035726557,499.8423222260392 397,490 C 464.35863964273443,480.1576777739608 571.0463758158709,490.4428031604259 646,510 C 720.9536241841291,529.5571968395741 764.173136379251,558.3864651322571 826,568 C 887.826863620749,577.6135348677429 968.2610786671246,568.0113363105462 1030,563 C 1091.7389213328754,557.9886636894538 1134.7825489522502,557.5681896255583 1200,552 C 1265.2174510477498,546.4318103744417 1352.608725523875,535.7159051872209 1440,525 L 1440,700 L 0,700 Z"); } 75%{ d: path("M 0,700 L 0,525 C 66.09000343524562,532.4482995534181 132.18000687049124,539.8965991068361 201,527 C 269.81999312950876,514.1034008931639 341.3699759532807,480.86190312607346 401,482 C 460.6300240467193,483.13809687392654 508.3400893163862,518.6557883888697 589,538 C 669.6599106836138,557.3442116111303 783.2696667811748,560.5149433184473 855,542 C 926.7303332188252,523.4850566815527 956.5812435589146,483.28443833734104 1008,475 C 1059.4187564410854,466.71556166265896 1132.4053589831672,490.3473033321883 1208,504 C 1283.5946410168328,517.6526966678117 1361.7973205084163,521.3263483339058 1440,525 L 1440,700 L 0,700 Z"); } 100%{ d: path("M 0,700 L 0,525 C 59.15286843009277,534.9924424596359 118.30573686018553,544.9848849192717 187,550 C 255.69426313981447,555.0151150807283 333.9299209893507,555.0529027825489 403,560 C 472.0700790106493,564.9470972174511 531.9745791824115,574.8035039505324 594,559 C 656.0254208175885,543.1964960494676 720.1717622810032,501.7330814153212 800,507 C 879.8282377189968,512.2669185846788 975.3383716935762,564.2641703881828 1042,559 C 1108.6616283064238,553.7358296118172 1146.4747509446925,491.21023703194777 1208,476 C 1269.5252490553075,460.78976296805223 1354.7626245276538,492.8948814840261 1440,525 L 1440,700 L 0,700 Z"); } }</style><defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stop-color="%23F78DA7"></stop><stop offset="95%" stop-color="%238ED1FC"></stop></linearGradient></defs><path d="M 0,700 L 0,525 C 59.15286843009277,534.9924424596359 118.30573686018553,544.9848849192717 187,550 C 255.69426313981447,555.0151150807283 333.9299209893507,555.0529027825489 403,560 C 472.0700790106493,564.9470972174511 531.9745791824115,574.8035039505324 594,559 C 656.0254208175885,543.1964960494676 720.1717622810032,501.7330814153212 800,507 C 879.8282377189968,512.2669185846788 975.3383716935762,564.2641703881828 1042,559 C 1108.6616283064238,553.7358296118172 1146.4747509446925,491.21023703194777 1208,476 C 1269.5252490553075,460.78976296805223 1354.7626245276538,492.8948814840261 1440,525 L 1440,700 L 0,700 Z" stroke="none" stroke-width="0" fill="url(%23gradient)" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-3"></path></svg>')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
          backgroundPosition: 'center', // Center the background image
              
        }}>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={()=>setLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={style}>
            <Box sx={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                flexWrap: 'wrap',
            }}>
            <Typography variant="h6" sx={{
                width: '100%', 
                textAlign: 'center', 
                text: 'bold',
                fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                }}>Upload Image</Typography>
            <label htmlFor="raised-button-file">
                <Button variant="contained" component="span" sx={{flexBasis: '100%' }}onClick={handleImageChange}>
                    Upload
                </Button>
            </label>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleImageChange}
            />
            
            {previewUrl && (
                <Box mt={2} mb={2} sx={{display:'flex',
                justifyContent:'center',
                alignItems:'center',
                flexWrap: 'wrap',
                width: '100%'}}>
                    <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </Box>
            )}
            </Box>
            <FormSelects values={{ countryIso, stateIso, city, setCountryIso, setStateIso, setCity }} />
            <TextField
                margin="normal"
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                autoFocus
                value={description}
                onChange={handleDescriptionChange}
            />
            <Collapse in={dataValid}>
                  <Alert severity="error"
                    action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                      setDataValidity(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                     }
                      sx={{ mb: 2 }}
                    >
                      {warningText}
                  </Alert>
                </Collapse>
                <Grid container spacing={2} p={2}>
                <Grid item xs={12} sm={6}>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                
                sx={{ mt: 3, mb: 2 }}
            >
                Submit
            </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => history("/user")}
            >
                Cancel
            </Button>
            
            </Grid>
            
            </Grid>
            
        </Box>
        </Box>
    );
};

export default UploadForm;
