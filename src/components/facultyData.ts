import { resolveLocalScrapedImage } from '../utils/localScrapedImages'

export interface FacultyData {
  name: string
  designation: string
  department: string
  email: string
  secondaryEmail: string
  mobile: string
  image: string | null
  office: string
  bioSummary: string
  researchAreas: string[]
  socials: { label: string; url: string }[]
  pdfUrl: string | null
  education: { degree: string; field: string; university: string; year: string }[]
  experience: { role: string; org: string; duration: string }[]
  metrics: {
    citationsScopus: number
    citationsCrossRef: number
    hIndex: number
    journals: number
    bookChapters: number
    conferences: number
    coauthors: number
    altmetrics: any[]
  } | null
  projects: any[]
  patents: any[]
  honours: { title: string; body: string; year: string }[]
  memberships: { body: string; details: string; year: string }[]
  journalPubs: string[]
  conferencePubs: string[]
}

export const facultyDataMap: Record<string, FacultyData> = {
  kaliappan: {
    name: 'Dr. M. KALIAPPAN',
    designation: 'Professor & Head',
    department: 'Artificial Intelligence and Data Science',
    email: 'kaliappan@ritrjpm.ac.in',
    secondaryEmail: 'kalsrajan@yahoo.co.in',
    mobile: '9003613335',
    image: resolveLocalScrapedImage("https://www.ritrjpm.ac.in/images/ai-and-ds/drmk_photo.jpg"),
    office: 'RIT Campus, HOD Cabin, Department of AI & DS',
    bioSummary: 'With over two decades of academic and research experience, his research focuses on Artificial Intelligence, Big Data Analytics, Neural Networks, and Robotic Process Automation.',
    researchAreas: ['Artificial Intelligence', 'Big Data Analytics', 'Ad hoc Networks', 'Neural Networks and Deep Learning', 'Robotic Process Automation'],
    socials: [
      { label: 'Vidwan ID: 168525', url: 'https://ritrjpm.irins.org/profile/168525' },
      { label: 'Google Scholar', url: 'https://scholar.google.co.in/citations?user=egJ_ihQAAAAJ' },
      { label: 'ResearchGate', url: 'https://www.researchgate.net/profile/Drm_Kaliappan_me_phd' },
      { label: 'ORCID ID', url: 'https://orcid.org/0000-0001-6177-7428' },
      { label: 'Scopus ID: 55315684100', url: 'http://www.scopus.com/authid/detail.url?authorId=55315684100' }
    ],
    pdfUrl: 'https://www.ritrjpm.ac.in/profile/_Dr.M.Kaliappan-Biodata-31.10.2023.pdf',
    education: [
      { degree: 'Ph.D', field: 'Information and Communication Engineering', university: 'Anna University, Chennai', year: '2015' },
      { degree: 'M.E', field: 'Computer Science and Engineering', university: 'Manonmaniam Sundaranar University, Tirunelveli', year: '2011' },
      { degree: 'B.E', field: 'Computer Science and Engineering', university: 'Madurai Kamaraj University, Madurai', year: '1999' }
    ],
    experience: [
      { role: 'Professor and Head', org: 'Ramco Institute of Technology, Rajapalayam', duration: '20.10.2021 - Present' },
      { role: 'Professor', org: 'Ramco Institute of Technology, Rajapalayam', duration: '02.11.2020 - 19.10.2021' },
      { role: 'Associate Professor', org: 'Ramco Institute of Technology, Rajapalayam', duration: '01.11.2018 - 01.11.2020' },
      { role: 'Associate Professor', org: 'National Engineering College, Kovilpatti', duration: '01.08.2016 - 26.10.2018' },
      { role: 'Assistant Professor (SG)', org: 'National Engineering College, Kovilpatti', duration: '06.08.2012 - 30.07.2016' },
      { role: 'Assistant Professor', org: 'National Engineering College, Kovilpatti', duration: '01.11.2011 - 05.08.2012' },
      { role: 'Lecturer', org: 'National Engineering College, Kovilpatti', duration: '01.12.2006 - 31.10.2011' },
      { role: 'Lecturer', org: 'SACS MAVMM Engg College, Madurai', duration: '14.08.2006 - 30.11.2006' }
    ],
    metrics: {
      citationsScopus: 1560,
      citationsCrossRef: 1307,
      hIndex: 19,
      journals: 64,
      bookChapters: 5,
      conferences: 27,
      coauthors: 451,
      altmetrics: []
    },
    projects: [
      {
        title: 'Automatic Book Reading System for Visually Impaired Person Using Deep Learning',
        agency: 'Institution of Engineers (India) Limited, Kolkata',
        status: 'Completed',
        role: 'CO-PI',
        budget: 'INR 20,000',
        duration: '2019 - 2020'
      }
    ],
    patents: [
      {
        title: 'SMART PROSTHETIC ARM USING ARTIFICIAL INTELLIGENCE AND ELECTROMYOGRAPHY SIGNALS',
        inventors: 'M. Kaliappan, S. Selva Birunda, R. Ramana',
        number: 'Patent No. 132616',
        status: 'Published',
        date: '2025-12-22',
        filedDate: '2025-12-01',
        org: 'RAMCO INSTITUTE OF TECHNOLOGY'
      }
    ],
    honours: [
      { title: "IUCEE Educator Certification", body: "Completed IUCEE International Engineering Educators Certification Program (IIEECP) with distinction.", year: "2019" },
      { title: "NPTEL Active SPOC Appreciation", body: "Received appreciation for Active NPTEL-SPOC based on performance and participation of candidates for the JAN-APR 2019 semester.", year: "2019" },
      { title: "COVID-19 Academic Continuity Appreciation", body: "Received Letter of Appreciation ensuring a smooth completion of the various academic activities in the COVID-19 impacted semester.", year: "2020" },
      { title: "IEEE Bangladesh Panel Member", body: "Acted as Panel member in Virtual Conference Organizers' Panel organized by IEEE Bangladesh section.", year: "2020" },
      { title: "IEEE GCCE Co-Chair", body: "Acted as session Co-Chair in IEEE 8th Global Conference on Consumer Electronics (GCCE 2019), Toyonaka-city, Osaka, Japan.", year: "2019" },
      { title: "Emerging Technology Reviewer Nominee", body: "Nominated as reviewer for International Conference on Emerging Technology and Interdisciplinary Sciences (ICETIS-2021).", year: "2021" },
      { title: "Anna University PhD Supervisor", body: "Recognized as Supervisor for Ph.D/M.S (By Research) programme under Anna University, Chennai.", year: "2018" }
    ],
    memberships: [
      { body: "Institution of Engineers (India) Limited (IEI)", details: "Life Member - (M-163955-7)", year: "-" },
      { body: "Computer Society of India (CSI)", details: "Member", year: "-" }
    ],
    journalPubs: [
      'Pradeepa S, Niveda Gaspar, Vimal.S, Subbulakshmi.P, Ahmed Alkhayyat, Kaliappan.M, "Classifying Promoters by Interpreting the Hidden Information of DNA Sequences for disease prediction in clinical laboratories using Gaussian Decision Boundary Estimation", Intelligent Decision Technologies, IOS Press, Oct 2023, IF 1.0, SCI.',
      'Azhagu Jaisudhan Pazhani.A, P. Gunasekaran, Vimal Shanmuganathan, Sangsoon Lim, Kaliappan Madasamy, Rajesh Manoharan and Amit Verma, "Peer–Peer Communication Using Novel Slice Handover Algorithm for 5G Wireless Networks", Journal of Sensor and Actuator Networks, Vol.11, No.82, November, 2022. SCI.',
      'L.Ganesan, C.Umarani, M.Kaliappan, Vimal Shanmuganathan, Seifedine Kadry, Yunyoung Nam, "Texture Image Analysis for Larger Lattice Structure using Orthogonal Polynomial framework", Journal of Information Technology and Control, Vol. 51, No. 3, September 2022, SCI, IF: 1.22.',
      'Karpagarajesh, G., Santhana Krishnan, R., Harold Robinson, S. Vimal, S. Thamizharasan, P. Subbulakshmi, M. Kaliappan, "Comparative analysis of FSO, OFC and diffused channel links in photonics using artificial intelligence based S-band, C-band and L-band of the attenuation metrics", Optical and Quantum Electronics, Vol. 54, No.420, PP.1-20, June 2022.',
      'K. Lakshmi Narayanan, R. Santhana Krishnan, Y. Harold Robinson, E. Golden Julie, S. Vimal, V. Saravanan, M. Kaliappan, "Banana Plant Disease Classification using Hybrid Convolutional Neural Network", Computational Intelligence and Neuroscience, Hindawi, Vol.2022, Article ID 9153699, Feb.2022, SCI, IF 3.633.',
      'S. Gopikumar, J. Rajesh Banu, Y. Harold Robinson, S. Raja, S. Vimal, Danilo Pelusi & M Kaliappan, "Geo Spatial Based Real Time Monitoring on Eutrophic Evaluation of Porunai River Basin for Pollution Risk Assessment", European Journal of Remote Sensing, pp:1-14, Feb 2022, SCIE, IF 3.71.',
      'S Vimal, Y Harold Robinson, M Kaliappan, Abdulellah A Alaboudi, Ashish Kr Luhach and Noor Zaman, "AI based Forecasting of Influenza Patterns from Twitter Information using Random Forest algorithm", Human-centric Computing and Information Sciences, Vol.11, No.33, pp.1-14, 2021, SCI, IF:3.7.',
      'M. Kaliappan, S. Vimal, K. Vijayalakshmi, Mi Young Lee, S. Manikandan, "OSDDY: Embedded system based Object Surveillance Detection System with small drone using Deep YOLO", EURASIP Journal on Image and Video Processing, Article no: 19, pp.2-14, 2021.',
      'Kaliappan Madasamy, Vimal Shanmuganathan, Gaurav Dhiman, K.Vijayalakshmi, P.SureshKumar, "Enhancing the QOS of far field networking and communication using the optical properties of graphene", Materials Today: Proceedings, Online March 2021 (Scopus Indexed).',
      'S. Vimal, Y. Harold Robinson, M. Kaliappan, K. Vijayalakshmi, Sanghyun Seo, "A method of progression detection for glaucoma using K-means and the GLCM algorithm toward smart medical prediction", Journal of Supercomputing, Published online: March 2021, SCIE, IF 2.6.',
      'S.Vimal, Y. Harold Robinson, M.Kaliappan, Subbulakshmi Pasupathi and A.Suresh, "Q Learning MDP Approach to Mitigate Jamming Attack Using Stochastic Game Theory Modelling With WQLA in Cognitive Radio Networks", Journal of Platform Technology, Vol. 9, No. 1, March 2021.',
      'R Venkatesh, C Bala Subramanian, M Kaliappan, "Rainfall Prediction using Generative Adversarial Networks with Convolution Neural Network", Soft Computing (Springer), Published online January 2021, SCI, IF: 3.05.',
      'Subbulakshmi Pasupathi, Vimal Shanmuganathan, Kaliappan Madasamy, Harold Robinson Yesudhas & Mucheol Kim, "Trend analysis using agglomerative hierarchical clustering approach for time series big data", The Journal of Supercomputing, Published online January 2021, SCI, Impact Factor: 2.469.',
      'V. Jackins, S. Vimal, Kaliappan, M., Mi Young Lee, "AI-based smart prediction of clinical disease using random forest classifier and Naive Bayes", Journal of Supercomputing, Published online Nov 2020, SCI, IF.2.4.',
      'M. Kaliappan, A.Niranjana Devi, R.Sandhiya, D.Lakshmanan, S.Selvakumari, "Water Tank Monitoring and Flame Detection Application Using LORA", Journal of Green Engineering, Vol.10, No.9, pp. 5748–5762, October 2020. Scopus Indexed.',
      'B. Vijayalakshmi, K. Ramar, M. Kaliappan, NZ Jhanjhi, Sahil Verma, K. Vijayalakshmi, S. Vimal, Kavita, Uttam Ghosh, "An Attention Based Deep Learning Model For Traffic Flow Prediction Using Spatio Temporal Features Towards Sustainable Smart City", International Journal of Communication Systems, Published online November 2020.',
      'M. Sivaram, M.Kaliappan, S. Jeya Shobana, M. Viju Prakash, V. Porkodi, K.Vijayalakshmi, S.Vimal, A.Suresh, "Secure Storage Allocation Scheme using Fuzzy Based Heuristic Algorithm for Cloud", Journal of Ambient Intelligence and Humanized Computing, IF 1.91, Published Online 14 May 2020.',
      'Ruben Gonzalez Crespo, Vimal S, Manju Khari, L. Kalaivani, Nilanjan Dey, M Kaliappan, "Energy enhancement using multi-objective ant colony optimization with double Q learning algorithm for IOT based cognitive radio networks", Computer Communications (Elsevier), IF:2.76, Vol. 154, 15, 2020, pp. 481-490.',
      'R.Venkatesh, C.Bala subramanian, M.Kaliappan, "Development of Big Data Predictive Analytics Model for Disease Prediction using Machine learning Technique", Journal of Medical Systems (Springer), Vol.43, Article number: 272, 2019, IF:2.09.',
      'R.Geetha, S.Siva subramanian, M.Kaliappan, S.Vimal, Dr.Suresh Annamalai, "Cervical Cancer Identification With Synthetic Minority Oversampling Technique And PCA Analysis Using Random Forest Classifier", Journal of Medical Systems (Springer), IF:2.09, Vol.43, Article number: 286, 2019.',
      'Nattar kannan, S. Siva Subramanian, M. Kaliappan, S.Vimal, A. Suresh and P. Subbulakshmi, "Artificial Intelligence based attack mitigation Using Stochastic Game Theory Modelling with WQLA in Cognitive Radio Networks", Journal of Web Engineering, IF: 0.4, Vol. 17, No.6, pp.3599 – 3618, 2018.',
      'S. Vimal, M. Kaliappan, A. Suresh, P. Subbulakshmi, Sanjeev Kumar, and Dinesh Kumar, "Development of Cloud Integrated Internet of Things Based Intruder Detection System", Journal of Computational Theoretical Nanoscience, Vol.15, pp.3570–3575, 2018.',
      'S. Vimal, L. Kalaivani, M. Kaliappan, A. Suresh, Xiao-Zhi Gao, R. Varatharajan, "Development of secured data transmission using machine learning-based discrete-time partially observed Markov model and energy optimization in cognitive radio networks", Journal of Neural Computing and Applications, IF:4.66, Vol.32, pp.151-161, 2020.',
      'K. Nattar kannan, S.Sivasubramanian, M.Kaliappan, S.Vimal, "Predictive big data analytic on demonetization data using support vector machine", Cluster Computing (Springer), IF:1.8, Vol.22, pp.14709-14720, 2019.',
      'Suthagar Ilango, S.Vimal, M.Kaliappan, P. Subbulakshmi, "Optimization using artificial bee colony based clustering approach for big data", Cluster Computing (Springer), IF: 1.8, Vol.22, pp. 12169–12177, September 2019.',
      'S.Vimal, L. Kalaivani, M.Kaliappan, "Collaborative approach on mitigating spectrum sensing data hijack attack and dynamic spectrum allocation based on CASG modeling in wireless cognitive radio networks", Cluster Computing (Springer), IF:1.8, Vol.22, pp.10491-10501, 2019.',
      'M.Kaliappan, Dr.B.Paramasivan, Susan Agustine, "Enhancing Energy Efficiency and Load Balanced Clustering Technique in MANET using Genetic Algorithms", Journal of Network and Computer Applications (Elsevier), IF: 6.28, Vol.73, pp.35-43, 2016.',
      'M. Kaliappan, E. Mariappan, M. Viju Prakash, and B. Paramasivan, "Load Balanced Clustering Technique in MANET using Genetic Algorithms", Defence Science Journal, IF:0.58, Vol. 66, No. 3, 2016, pp.251-258.',
      'E. Mariappan, M. Kaliappan, S. Vimal, "Energy Efficient Routing Protocol Using Grover’s Searching Algorithm for MANET", Asian Journal of Information Technology, Vol.14, no.24, pp.4986-4994, 2016.',
      'M.Kaliappan, Dr.B.Paramasivan, "Enhancing secure routing in Mobile Ad Hoc Networks using a Dynamic Bayesian Signalling Game model", Computers & Electrical Engineering (Elsevier), IF:0.816, Vol.4, pp.301-313, 2015.',
      'M.Viju Prakash, M. Kaliappan, B. Paramasivan, "Energy Efficient Dynamic Load Balanced Clustering Protocol using Memory Enhanced Genetic Scheme and Elitism based Immigrant Genetic Scheme for MANET", Journal of Pure and Applied Microbiology, Vol. 9, Nov. 2015.',
      'Balasubramanian Paramasivan, Maria Johan Viju Prakash, and Madasamy Kaliappan, "Development of a Secure Routing Protocol using Game Theory Model in Mobile Ad Hoc Networks", Journal of Communications and Networks, IF:1.0, Vol. 17, No. 1, pp.75-83, February 2015.',
      'M.Kaliappan, Paramasivan, B, "Development of secure cluster based multipath routing scheme for MANET", International Journal of Applied Engineering Research, vol.10, no.12, pp.31565-31583, 2015.',
      'M.Kaliappan, Dr.B.Paramasivan, "Secure and Fair Cluster Head Selection Protocol for Enhancing Security in Mobile Ad Hoc Networks", Scientific World Journal, IF:1.2, Volume 2014, Article ID 608984, 6 pages, 2014.',
      'M.Kaliappan, Dr.B.Paramasivan, K.Mohaideen pitchai, K.Bhavaneswari, "Enhancement of Security and Congestion Adaptiveness in Dynamic Source Routing Protocol", International Journal of Networking and Communication Engineering, Vol.4, No.7, pp. 266-370, June 2012.'
    ],
    conferencePubs: [
      'Kaliappan Madasamy, Vimal Shanmuganathan, Nithish, Vishakan, Vijayabhaskar, Muthukumar, Balamurali Ramakrishnan, Ramnath.M, "Benign and Malignant Cancer Prediction using Deep Learning and Generating Pathologist Diagnostic Report", Second International Conference on Internet of Things and Health (IoTHIC-2023), October 20-21 2023, Istanbul, Turkey.',
      'Karpagavalli. C, Kaliappan. M, Amuthachenthiru. K, "Radial Basis Function Neural Network for Intrusion Detection and Feed Forward Artificial Neural Network for Attack Mitigation in IoT", Second International Conference on Augmented Intelligence and Sustainable Systems (ICAISS 2023), IEEE.',
      'K.Vijayalakshmi, M.Kaliappan, R.Siva Ranjini, M.Sasi Rekha, and R.Selva Ishwarya, "Automatic Book Reading System for Visually Impaired Person using Deep Learning", National Web Conference on Challenges and Innovation in Engineering And Technology (NWCCIET-2021).',
      'M.Kaliappan, K.Vijayalakshmi, and P.Rajarajeswari, "Automatic Questionnaire Generator using Deep Learning", National Web Conference on Challenges and Innovation in Engineering And Technology (NWCCIET-2021).',
      'S. Vimal, Y. Harold Robinson, M. Kaliappan, K. Vijayalakshmi, Sanghyun Seo, "Progression Detection of Glaucoma using K-Means and GLCM Algorithm", The 22nd International Conference on Artificial Intelligence (ICAI\'20), Las Vegas, USA.',
      'P. Subbulakshmi, S. Vimal, M. Kaliappan, Y. Harold Robinson, Mucheol Kim, "Trend Analysis using Agglomerative Hierarchical Clustering Approach for Time Series Big Data", The 22nd International Conference on Artificial Intelligence (ICAI\'20), Las Vegas, USA.',
      'V. Jackins, S. Vimal, M. Kaliappan, Mi Young Lee, "Prediction of Clinical Disease with AI based Multiclass Classification using Naive-Bayes and Random Forest Classifier", The 22nd International Conference on Artificial Intelligence (ICAI\'20), Las Vegas, USA.',
      'M.Kaliappan, C.A Yogaraja, A.Niranjana Devi, R.Sandhiya, and S.Selvakumari, "Water Tank Monitoring and Flame Detection using LORA", International Web Conference on Smart Engineering Technologies (IWCSET-2020), Rajapalayam.',
      'R.Venkatesh, M.Kaliappan, C. Balasubramanian, K.R.Geerthanapriya, "Rainfall Prediction System Using Generative Adversarial Networks", International Web Conference on Smart Engineering Technologies (IWCSET-2020), Rajapalayam.',
      'M. Kaliappan, B. Vijayalakshmi, Manikandan, M.Shrimalavika, G.Shunmugavalli and A. VijayaMalini, "SEO Analysis for B2B websites using Google Webmaster tools", International Web Conference on Smart Engineering Technologies (IWCSET-2020), Rajapalayam.',
      'M Kaliappan, B Paramasivan, T. Dhivya, "Development of Energy Efficient Dynamic Load Balanced Clustering Protocol Using Dynamic Genetic Algorithm in MANET", National Conf. on Frontiers in Applied Sciences And Computer Technology (FACT’15).',
      'M Kaliappan, G.Murugeswari, "Secure Congestion Adaptive Routing protocol for Mobile Adhoc Network", Intelligent Computing in Communication & Automation (NCICCA-2011).',
      'B.Paramasivan, K. Mohaideen Pitchai, M.Kaliappan, "A Novel routing protocol for improving energy efficiency using fuzzy logic in wireless sensor networks", IEEE Sensor 2012.',
      'M Kaliappan, B Paramasivan, "Enhancing Energy Efficiency in Mobile Adhoc Network Using Agglomerative Hierarchical Clustering Technique", ASCENT 2015.',
      'M.Kaliappan, "Secure Congestion Adaptive Routing protocol for Mobile Adhoc Networks", National Conference on Emerging Trends in Computing Technologies, 2011.',
      'S. Rimlon Shibi, M. Kaliappan, L. Jerart Julus, "IPSec Provisioning in WiMAX Networks to Enhance the Security", International Conference on Recent Trends in Computational Methods, Communication and Controls, 2012.',
      'G. Sivakumar, M.Kaliappan, L. Jerart Julus, "Enhancing the Performance of MANET using EESCP", International Conference on Pattern Recognition, Informatics and Medical Engineering (PRIME 2012).',
      'S. Rimlon Shibi, M. Kaliappan, L. Jerart Julus, "Analysis and Security Enhancement in Wimax Networks", Emerging Technology Trends in Advanced Engineering Research (ICEN 2012).',
      'S. Rimlon Shibi, M. Kaliappan, L. Jerart Julus, "Development of Energy Efficiency and Secure Communication Protocol in MANET", Emerging Trends in Computer & Communication Technologies (EMICS’12).',
      'S.M.R.Sreedhar Surya Prakash, S.Vinoth, M.Kaliappan, "Energy Efficient Routing Protocol Based On Grover’s Searching Algorithm For Mobile Adhoc Networks", National Conference on Recent Trends In Information Technology, 2014.',
      'J Vivek narayanan, M Kaliappan, "Automatic Polling Service in Electronic Voting Machine", National Conf. on Frontiers in Applied Sciences And Computer Technology (FACT’15).',
      'P.Bagavath, J.Subash, H.Venkatesh, M. Kaliappan, "Optimal Double Route Search for Enhancing Energy Efficiency in Mobile Adhoc Network", National Conference on Recent Issues in Network Galaxy (RING’14).',
      'T.Dhivya, M Kaliappan, "Enhancing energy efficient dynamic load balanced clustering protocol using Dynamic Genetic Algorithm in MANET", International Conference on Innovations in Communications and Computer Engineering (ICICCE’15).',
      'M.Kaliappan, R.Sujitha, P.Subbulakshmi, A.H.Ragamathu nisa begum, "Security Enhancement In MANET Using Game Theory Approach", International Conference on Advanced Computing, Machines and Embedded Technology, 2013.',
      'K. Amsaveni, M. Kaliappan, P.Subbulakshmi, Dr.D.Manimegalai, "An Energy Efficient Leader Election Model In MANET Using Mechanism Design Theory", International Conference on Advanced Computing, Machines and Embedded Technology, 2013.',
      'R.Sujitha, M.Kaliappan, P.Subbulakshmi, "A Comprehensive Survey on Security Enhancement in Mobile Adhoc Networks using Game theory Approaches", International Conference on Egovernance And Cloud Computing Services (Egov’12).',
      'K. Amsaveni, M.Kaliappan, P.Subbulakshmi, B.Paramasivan, "A Survey On Leader Election Models In Mobile Ad Hoc Networks", International Conference on Egovernance And Cloud Computing Services (Egov’12).'
    ]
  },
  anandhi: {
    name: 'Dr. S.V. ANANDHI',
    designation: 'Associate Professor – Grade II',
    department: 'Artificial Intelligence and Data Science',
    email: 'anandhi@ritrjpm.ac.in',
    secondaryEmail: 'svanandhi2020@gmail.com',
    mobile: '9486856060',
    image: resolveLocalScrapedImage("https://www.ritrjpm.ac.in/gallery1/468/305_Dr.Anandhi_Picture.jpg"),
    office: 'RIT Campus, Department of AI & DS',
    bioSummary: 'With over 19 years of teaching experience, her research focuses on Image Processing, Deep Learning, and Multivariate Analysis.',
    researchAreas: ['Image Processing', 'Deep Learning', 'Multivariate Analysis'],
    socials: [],
    pdfUrl: 'https://www.ritrjpm.ac.in/profile/305_AD_Dr.Anadhi_Profile.pdf',
    education: [
      { degree: 'Ph.D', field: 'Information and Communication Engineering', university: 'Anna University, Chennai', year: '2024' },
      { degree: 'M.E', field: 'Computer Science and Engineering', university: 'Anna University, Tirunelveli', year: '2010' },
      { degree: 'B.E', field: 'Computer Science and Engineering', university: 'Anna University, Chennai', year: '2006' }
    ],
    experience: [
      { role: 'Associate Professor – Grade II', org: 'Ramco Institute of Technology, Rajapalayam', duration: '04.06.2025 - Present' },
      { role: 'Assistant Professor', org: 'Dr. Sivanthi Aditanar College of Engineering, Tiruchendur', duration: '01.06.2012 - 02.06.2025' },
      { role: 'Lecturer', org: 'Dr. Sivanthi Aditanar College of Engineering, Tiruchendur', duration: '27.07.2006 - 31.05.2012' }
    ],
    metrics: {
      citationsScopus: 0,
      citationsCrossRef: 0,
      hIndex: 2,
      journals: 11,
      bookChapters: 0,
      conferences: 35,
      coauthors: 25,
      altmetrics: []
    },
    projects: [
      {
        title: 'Detection of disease in leaf using Image segmentation',
        agency: 'Tamil Nadu State Council for Science and Technology (TNSCST)',
        status: 'Completed',
        role: 'Guide / PI',
        budget: 'INR 7,500',
        duration: '2013 - 2014'
      }
    ],
    patents: [],
    honours: [],
    memberships: [],
    journalPubs: [
      'S. V. Anandhi, "Threshold based Forest Fire Detection in Utharkhand Region using Landsat Satellite Images", Indian Journal Of Technical Education, Volume 47, pp. 1-11, 2024.'
    ],
    conferencePubs: [
      'S.V.Anandhi, K.Kavitha, "Detecting Intrusions In Multi Tier Web Application Using Double Guard", International Conference On Recent Trends In Engineering Technology (ICRTET), CSI, 2014.'
    ]
  },
  selvabirunda: {
    name: 'Ms. S. SELVA BIRUNDA',
    designation: 'Assistant Professor',
    department: 'Artificial Intelligence and Data Science',
    email: 'sbirunda@gmail.com',
    secondaryEmail: 'selvabirunda@ritrjpm.ac.in',
    mobile: '8220082523',
    image: resolveLocalScrapedImage("https://www.ritrjpm.ac.in/gallery1/468/225_Dr.S.Selva_Birundha_1.jpeg"),
    office: 'RIT Campus, Department of AI & DS',
    bioSummary: 'Pursuing her Ph.D. and having over 10 years of academic experience, her research interests include Artificial Intelligence, Machine Learning, Deep Learning, and Wireless Sensor Networks.',
    researchAreas: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Wireless Sensor Networks'],
    socials: [
      { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=22Vw5jkAAAAJ&hl=en' },
      { label: 'ResearchGate', url: 'https://www.researchgate.net/profile/Selva-Birunda' },
      { label: 'ORCID ID', url: 'https://orcid.org/0000-0002-9122-5250' }
    ],
    pdfUrl: 'https://www.ritrjpm.ac.in/profile/225_Ms.SSelvaBirunda-Profile.pdf',
    education: [
      { degree: 'Ph.D (Pursuing)', field: 'Computer Science and Engineering (AI & DS)', university: 'Kalasalingam Academy of Research and Education (Part Time)', year: 'Pursuing' },
      { degree: 'M.Tech', field: 'Computer Science and Engineering', university: 'Kalasalingam University', year: '2012' },
      { degree: 'B.E', field: 'Computer Science and Engineering', university: 'V.P.M.M Engineering College for Women / Anna University Chennai', year: '2010' }
    ],
    experience: [
      { role: 'Assistant Professor', org: 'Ramco Institute of Technology, Rajapalayam', duration: '03.08.2022 - Present' },
      { role: 'Assistant Professor', org: 'V.P.M.M Engineering College for Women, Srivilliputhur', duration: '15.05.2013 - 31.05.2018' }
    ],
    metrics: {
      citationsScopus: 0,
      citationsCrossRef: 0,
      hIndex: 8,
      journals: 2,
      bookChapters: 1,
      conferences: 7,
      coauthors: 8,
      altmetrics: []
    },
    projects: [],
    patents: [],
    honours: [
      { title: 'Produced 100% Result', body: 'Database Management Systems (DBMS) and Principles of Programming Languages (PPL)', year: 'Academic Achievement' }
    ],
    memberships: [],
    journalPubs: [
      'Birunda, S. S., & Devi, R. K., "Improving Energy Efficient Aspect of Spam Classification Framework using Ensemble Machine Learning", Solid State Technology, 63(5), 9032-9039, 2020.'
    ],
    conferencePubs: [
      'S. Selva Birunda, "A review on word embedding techniques for text classification", International Conference on Sentiment Analysis and Deep Learning (ICSADL \'20), 2021.'
    ]
  },
  ramnath: {
    name: 'Mr. M. RAMNATH',
    designation: 'Assistant Professor',
    department: 'Artificial Intelligence and Data Science',
    email: 'ramnath@ritrjpm.ac.in',
    secondaryEmail: 'ramnath25@gmail.com',
    mobile: '9944693617',
    image: resolveLocalScrapedImage("https://www.ritrjpm.ac.in/gallery1/468/240_ad_ram.jpg"),
    office: 'RIT Campus, Department of AI & DS',
    bioSummary: 'Pursuing his Ph.D. and having over 12 years of teaching experience, his research areas include Networking, Artificial Intelligence, Machine Learning, Deep Learning, Sentiment Analysis, and Natural Language Processing.',
    researchAreas: ['Networking', 'Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Sentiment Analysis', 'Natural Language Processing'],
    socials: [
      { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=blSpSbQAAAAJ&hl=en' },
      { label: 'ResearchGate', url: 'https://www.researchgate.net/profile/Ramnath-Muthusamy-2' },
      { label: 'ORCID ID', url: 'https://orcid.org/0000-0002-9397-9320' }
    ],
    pdfUrl: 'https://www.ritrjpm.ac.in/profile/240_Mr.Ramnath_AD.pdf',
    education: [
      { degree: 'Ph.D (Pursuing)', field: 'Information and Communication Engineering', university: 'Anna University', year: 'Pursuing' },
      { degree: 'M.E', field: 'Network Engineering', university: 'VelTech MultiTech Dr. Rangarajan Dr. Shakuntala Engineering College / Anna University', year: '2011' },
      { degree: 'B.Tech', field: 'Information Technology', university: 'Francis Xavier Engineering College, Tirunelveli / Anna University', year: '2009' }
    ],
    experience: [
      { role: 'Assistant Professor', org: 'Ramco Institute of Technology, Rajapalayam', duration: '05.06.2023 - Present' },
      { role: 'Assistant Professor', org: 'Thamirabharani Engineering College, Tirunelveli', duration: '23.05.2018 - 03.06.2023' },
      { role: 'Assistant Professor', org: 'JP College of Engineering, Tenkasi', duration: '04.06.2012 - 30.04.2018' },
      { role: 'Assistant Professor', org: 'St. Mother Theresa Engineering College, Tuticorin', duration: '03.06.2011 - 31.05.2012' }
    ],
    metrics: {
      citationsScopus: 0,
      citationsCrossRef: 0,
      hIndex: 3,
      journals: 6,
      bookChapters: 0,
      conferences: 4,
      coauthors: 5,
      altmetrics: []
    },
    projects: [],
    patents: [],
    honours: [],
    memberships: [
      { body: 'International Computer Science and Engineering Society (ICSES)', details: 'Member ID: 39893', year: '-' },
      { body: 'International Association of Engineers (IAENG)', details: 'Member ID: 279792', year: '-' }
    ],
    journalPubs: [
      'M. Ramnath and D. Kani Jesintha, "Dynamic analysis of agent network in self-organisation using service level agreement technique", International Journal of Engineering and Science Invention, Vol. 4, Issue 3, March 2015.'
    ],
    conferencePubs: [
      'M. Ramnath, "PMG based handoff in wireless mesh networks", National Conference (NCAT\'11), 2011.'
    ]
  },
  "karpagavalli": {
    name: "MRS.C.KARPAGAVALLI. M.E.(PH.D)",
    designation: "Assistant Professor",
    department: "Artificial Intelligence and Data Science",
    email: "karpagavalli@ritrjpm.ac.in",
    secondaryEmail: "ckvalli08@gmail.com",
    mobile: "9047918934",
    image: resolveLocalScrapedImage("https://www.ritrjpm.ac.in/gallery1/468/232_Karpagavalli.jpg"),
    office: 'RIT Campus, Department of AI & DS',
    bioSummary: "Pursuing her Ph.D. with active research interests in the Internet of Things, Artificial Intelligence, and Machine Learning, she contributes to engineering education and advanced research projects.",
    researchAreas: ["Internet of Things", "Artificial Intelligence", "Machine Learning"],
    socials: [
      { label: 'Google Scholar', url: "https://scholar.google.com/citations?view_op=list_works&hl=en&authuser=2&user=m_XVSXMAAAAJ" },
      { label: 'ResearchGate', url: "https://www.researchgate.net/profile/C-Karpagavalli" },
      { label: 'ORCID ID', url: "https://orcid.org/0000-0001-8073-4941" }
    ],
    pdfUrl: "https://www.ritrjpm.ac.in/profile/232_C.Karpagavalli-Bio-Data.pdf",
    education: [
      { degree: "Ph.D (Pursuing)", field: "Information and Communication Engineering", university: "Thiagarajar College of Engineering / Anna University, Chennai", year: "Pursuing" },
      { degree: "M.E", field: "Computer Science and Engineering", university: "PSR Engineering College / Anna University, Chennai", year: "2013" },
      { degree: "B.E", field: "Computer Science and Engineering", university: "SCAD College of Engineering and Technology / Anna University, Chennai", year: "2005" }
    ],
    experience: [
      { role: "Assistant Professor", org: "Ramco Institute of Technology, Rajapalayam", duration: "08.12.2022 - Present" },
      { role: "Assistant Professor", org: "Amrita College of Engineering and Technology, Nagercoil", duration: "24.02.2021 - 07.12.2022" },
      { role: "Assistant Professor", org: "SCAD College of Engineering and Technology, Cheranmahadevi", duration: "26.06.2013 - 20.02.2021" }
    ],
    metrics: {
      citationsScopus: 73,
      citationsCrossRef: 65,
      hIndex: 3,
      journals: 7,
      bookChapters: 0,
      conferences: 5,
      coauthors: 10,
      altmetrics: []
    },
    projects: [],
    patents: [
      {
        title: "IoT based water quality monitoring for Textile Industry",
        inventors: "Dr.V.Priya, Dr.S.Sudhakar, Dr.S.Sharavanan, Dr.A.Vishnu Priya, Mrs.C.Karpagavalli, Dr. M.B.Suresh, Ms. K.Vidhya, Dr. Pankaj Dadheech, Mr. Gourav Purohit",
        number: "202041012885",
        status: "Published",
        date: "2020-05-08",
        filedDate: "2020-03-24",
        org: "Indian Patent Office"
      }
    ],
    honours: [
      { title: "Anna University Rank", body: "Secured Anna University 34th Rank in M.E., Computer Science and Engineering for the Academic year 2012-2013.", year: "2013" },
      { title: "Best Outgoing Student", body: "Certificate of Merit for M.E (CSE) at PSR Engineering College, Sivakasi, 2011-2013 Batch.", year: "2013" },
      { title: "Outstanding Performance", body: "Award of credit and honor for Outstanding Performance in SCAD Development Activities for the year 2015.", year: "2015" }
    ],
    memberships: [
      { body: "Computer Society of India (CSI)", details: "Member", year: "-" }
    ],
    journalPubs: [
      "C.Karpagavalli, R.Suganya, P.J.Beslin Pajila, 'Authentication Using Blockchain Novel Enhanced Authentication Algorithm', International Journal of Advanced Science and Technology, Volume. 29, No. 7, (2020), pp. 11930 – 11940.",
      "P.J.Beslin Pajila, C.Karpagavalli, G.Vijayarani, Mangaiyarkarasi.T, Madhubalashanmu.R, 'Effective way to Analyze and Rupture the Assessment using ESB Algorithm', International Journal of Recent Technology and Engineering, Volume-8 Issue-6, March 2020.",
      "P.J.Beslin Pajila, P.Jenifer, C.Karpagavalli, 'Software Defined Networking Based Protection against DDOS in IOT', International Journal of Innovative Technology and Exploring Engineering, Volume-9 Issue-5, March 2020.",
      "C.Karpagavalli, S. Sakthi selvi, V. Latha, M.Kalaiarasi, J.Epsiba, 'Enabling Identity- Based Integrity Auditing and Data Sharing with Sensitive Information Hiding for Secure Cloud Storage', Journal of Emerging Technologies and Innovative Research, April 2020, Volume 7, Issue 4.",
      "C.Karpagavalli, M. Karthika, J. Mercy, A. Kavinaya, K. Athirsta Devi, 'System modelling and performance Cloud Security Based Trust Assessment', Journal of Emerging Technologies and Innovative Research, April 2020, Volume 7, Issue 4.",
      "M.Christina Ranjitham, C.Karpagavalli, D.Asir 'Novel Technique to Protect the Stealing of Authorization Code Using Hybrid Approach', IJRESM, Volume-2, Issue-12, December-2019.",
      "C.Karpagavalli, J.Esther Rani, J.Santhiya, G.Sajitha 'Efficient Bio Signals Monitoring System using Wireless Sensors' IJESC, Volume 9, Issue No.3, 2019."
    ],
    conferencePubs: [
      "DDoS attack detection and mitigation in IoT environment via software defined network – A survey, SMART’22, St.Mother Theresa Engineering College, Tuticorin, 2022.",
      "Efficient Bio Signals and Health Monitoring System Using Wireless Sensor, ICCT’19, Jayaraj Annapackiam CSI College of Engineering, Nazareth, 2019.",
      "An Automatic Restoration Framework for Image Enhancement, ICCTRD’13, SCAD College of Engineering and Technology, Cheranmahadevi, 2013.",
      "Defect Detection and Removal of Artifacts in Photographs, NACIPAN ’13, National Engineering College, Kovilpatti, 2013.",
      "An automatic framework for image restoration and enhancement, Emerging Trends in Computing, PSR Engineering College, Sivakasi, 2012."
    ]
  },
  "sankaralakshmi": {
    name: "MRS.B.SANKARALAKSHMI B.E.M.TECH.",
    designation: "Assistant Professor",
    department: "Artificial Intelligence and Data Science",
    email: "sankaralakshmi@ritrjpm.ac.in",
    secondaryEmail: "",
    mobile: "8939743254",
    image: resolveLocalScrapedImage("https://www.ritrjpm.ac.in/gallery1/468/272_Sankari-Photo-jpg.JPG"),
    office: 'RIT Campus, Department of AI & DS',
    bioSummary: "With active research interests in Computer Science & Engineering, Nomadic Computing, Mobile Computing, and Digital Image Processing, she contributes to engineering education and advanced research projects.",
    researchAreas: ["Nomadic Computing", "Mobile Computing", "Digital Image Processing", "Computer Science"],
    socials: [],
    pdfUrl: "https://www.ritrjpm.ac.in/profile/272_BIODATA-SankariRIT.pdf",
    education: [
      { degree: "B.Ed", field: "Computer Science", university: "Angel College of Education, Rajapalayam / TNTEU, Chennai", year: "2021" },
      { degree: "M.Tech", field: "Information Technology", university: "PSN College of Engineering and Technology / Anna University, Tirunelveli", year: "2009" },
      { degree: "B.E", field: "Computer Science and Engineering", university: "PSN College of Engineering and Technology / Anna University, Chennai", year: "2006" }
    ],
    experience: [
      { role: "Assistant Professor", org: "Ramco Institute of Technology, Rajapalayam", duration: "05.06.2024 - Present" },
      { role: "Assistant Professor", org: "PSN College of Engineering and Technology, Tirunelveli", duration: "01.06.2009 - 08.02.2013" },
      { role: "Assistant Professor", org: "PSN College of Engineering and Technology, Tirunelveli", duration: "12.06.2006 - 31.08.2007" }
    ],
    metrics: {
      citationsScopus: 0,
      citationsCrossRef: 0,
      hIndex: 1,
      journals: 0,
      bookChapters: 0,
      conferences: 1,
      coauthors: 2,
      altmetrics: []
    },
    projects: [],
    patents: [],
    honours: [
      { title: "TRB Polytechnic Lecturer Selection", body: "Shortlisted for Certificate Verification for Lecturers in Government Polytechnic Colleges by Teachers Recruitment Board.", year: "2022" }
    ],
    memberships: [],
    journalPubs: ["Publications listed in the official bio-data file."],
    conferencePubs: [
      "Implementation of Multichannel Communications Using Stop-and-Wait ARQ, International Conference on Computational Systems and Communication Technology (CSCT), Einstein College of Engineering, May 2010.",
      "National Seminar on Contemporary Research Avenues in Nomadic Computing, National Engineering College, Kovilpatti, December 2009.",
      "Workshop on Challenges in Mobile Computing, Einstein College of Engineering, Tirunelveli, March 2010.",
      "Third National Seminar on Research Issues in Digital Image Processing, Mepco Schlenk Engineering College, Sivakasi, March 2010.",
      "Fourth National Seminar on Research Issues in Digital Image Processing, Mepco Schlenk Engineering College, Sivakasi, March 2011."
    ]
  },
  "anitha": {
    name: "B. ANITHA M.E.",
    designation: "Assistant Professor",
    department: "Artificial Intelligence and Data Science",
    email: "anitha@ritrjpm.ac.in",
    secondaryEmail: "anithabalan.official@gmail.com",
    mobile: "9443388165",
    image: resolveLocalScrapedImage("https://www.ritrjpm.ac.in/gallery1/468/332_Anitha_Photo.jpg"),
    office: 'RIT Campus, Department of AI & DS',
    bioSummary: "With active research interests in Deep Learning, Leukemia Blood Cancer Detection, Natural Language Processing, and Quantum Computing, she contributes to engineering education and advanced research projects.",
    researchAreas: ["Deep Learning", "Medical Image Processing", "Natural Language Processing", "Quantum Computing"],
    socials: [],
    pdfUrl: "https://www.ritrjpm.ac.in/profile/332_ANITHA_PROFILE.pdf",
    education: [
      { degree: "M.E", field: "Computer Science and Engineering", university: "VV College of Engineering / Anna University", year: "2025" },
      { degree: "B.Tech", field: "Information Technology", university: "Dr. Sivanthi Aditanar College of Engineering / Anna University", year: "2023" }
    ],
    experience: [
      { role: "Assistant Professor - I", org: "Ramco Institute of Technology, Rajapalayam", duration: "23.10.2025 - Present" }
    ],
    metrics: {
      citationsScopus: 0,
      citationsCrossRef: 0,
      hIndex: 1,
      journals: 0,
      bookChapters: 0,
      conferences: 3,
      coauthors: 2,
      altmetrics: []
    },
    projects: [],
    patents: [],
    honours: [
      { title: "Best Paper Award", body: "Received Best Paper Award at the International Conference ICETEMA 2025 organized by PET College of Engineering.", year: "2025" },
      { title: "Academic Topper", body: "Secured Academic Topper status at VV College of Engineering.", year: "2025" },
      { title: "Best Project Award", body: "Received Best Project Award at Dr. Sivanthi Aditanar College of Engineering.", year: "2023" },
      { title: "Quantum Computing Certification", body: "Completed 'Quantum Computing' certification course by CDAC & IIT Rookie (Meity).", year: "2025" },
      { title: "NLP Master Class", body: "Completed 21-day Master Class on Natural Language Processing by Pantech e Learning.", year: "2024" },
      { title: "Advanced Python Master Class", body: "Completed 21-day Master Class on Advanced Python Programming by Pantech e Learning.", year: "2024" },
      { title: "Raspberry Pi Master Class", body: "Completed 21-day Master Class on Raspberry Pi by Pantech e Learning.", year: "2024" }
    ],
    memberships: [],
    journalPubs: [],
    conferencePubs: [
      "Acute Lymphoblastic Leukemia Detection and Classification using Deep CNN and ML classifiers, International Conference on Emerging Trends in Engineering, Management and Applications (ICETEMA-2K25), PET College of Engineering, Vallioor, April 2025.",
      "Leukemia blood cancer detection using convolutional neural network (CNN), National Grand Research Competition (NGRC 2025), DMI College of Engineering, Aralvaimozhi, May 2025.",
      "Deep learning based leukemia detection, National Conference on Pure and Discrete Mathematics, St. John’s College, Tirunelveli, February 2025."
    ]
  },
  "dhanalakshmi": {
    name: "DHANALAKSHMI K",
    designation: "Assistant Professor",
    department: "Artificial Intelligence and Data Science",
    email: "dhanalakshmi@ritrjpm.ac.in",
    secondaryEmail: "ishwaryaranju1999@gmail.com",
    mobile: "9789288508",
    image: resolveLocalScrapedImage("https://www.ritrjpm.ac.in/gallery1/468/333_Dhanalakshmi_Photo.jpg"),
    office: 'RIT Campus, Department of AI & DS',
    bioSummary: "With active research interests in Edge Computing, Cloud Storage Security, and Android Mobile Application Development, she contributes to engineering education and advanced research projects.",
    researchAreas: ["Edge Computing", "Cloud Storage Security", "Android App Development"],
    socials: [],
    pdfUrl: "https://www.ritrjpm.ac.in/profile/333_Dhanalakshmi_Profile.pdf",
    education: [
      { degree: "M.E", field: "Computer Science and Engineering", university: "P.S.R. Engineering College / Anna University, Chennai", year: "2025" },
      { degree: "B.E", field: "Computer Science and Engineering", university: "P.S.R.Rengasamy College of Engineering for women / Anna University, Chennai", year: "2021" }
    ],
    experience: [
      { role: "Assistant Professor", org: "Ramco Institute of Technology, Rajapalayam", duration: "03.09.2025 - Present" },
      { role: "System Admin", org: "P.S.R. Engineering College, Sivakasi", duration: "01.09.2021 - 30.06.2023" }
    ],
    metrics: {
      citationsScopus: 0,
      citationsCrossRef: 0,
      hIndex: 1,
      journals: 1,
      bookChapters: 0,
      conferences: 0,
      coauthors: 2,
      altmetrics: []
    },
    projects: [],
    patents: [],
    honours: [
      { title: "Android App Development Certification", body: "Completed Android App Development training program at Soft Skill Technology.", year: "2020" },
      { title: "Dot Net Framework Training", body: "Completed Dot Net Framework 4.5 (C#) and SQL Server 2005 training at Iconix Software Solution.", year: "2020" },
      { title: "Uniq Android Training", body: "Completed Android App Development training program at Uniq Technologies.", year: "2020" },
      { title: "Web Developing Program", body: "Completed Web Developing Program at Iconix Software Solution.", year: "2020" }
    ],
    memberships: [],
    journalPubs: [
      "Dhanalakshmi K, 'An Approach for Enhancing Security of Data using Edge Computing for Cloud Storage', Journal of Huazhong University of Science and Technology, Volume 50, Issue 03, March 2021."
    ],
    conferencePubs: []
  },
  "revathi": {
    name: "MRS. B.REVATHI M.E.",
    designation: "Assistant Professor",
    department: "Artificial Intelligence and Data Science",
    email: "revathib@ritrjpm.ac.in",
    secondaryEmail: "revas85@gmail.com",
    mobile: "9751855561",
    image: resolveLocalScrapedImage("https://www.ritrjpm.ac.in/gallery1/468/224_revathi-1.jpg"),
    office: 'RIT Campus, Department of AI & DS',
    bioSummary: "Pursuing her Ph.D. with active research interests in Machine Learning and Deep Learning, she contributes to engineering education and advanced research projects.",
    researchAreas: ["Machine Learning", "Deep Learning"],
    socials: [
      { label: 'Vidwan Profile', url: "https://vidwan.inflibnet.ac.in/profile/290637" },
      { label: 'Google Scholar', url: "https://scholar.google.com/citations?view_op=list_works&hl=en&user=0ybnsisAAAAJ" },
      { label: 'ResearchGate', url: "https://www.researchgate.net/profile/B-Revathi-3" },
      { label: 'ORCID ID', url: "https://orcid.org/0000-0001-6444-7395" }
    ],
    pdfUrl: "https://www.ritrjpm.ac.in/profile/_B.Revathi-Biodata-21.10.2024.pdf",
    education: [
      { degree: "Ph.D (Pursuing)", field: "Electronics and Communication Engineering", university: "Anna University, Chennai", year: "Pursuing" },
      { degree: "M.E", field: "Computer & Communication", university: "National Engineering College, Kovilpatti", year: "2014" },
      { degree: "B.E", field: "Computer Science and Engineering", university: "Mepco Schlenk Engineering College, Sivakasi", year: "2011" }
    ],
    experience: [
      { role: "Assistant Professor", org: "Ramco Institute of Technology, Rajapalayam", duration: "28.07.2022 - Present" },
      { role: "Assistant Professor", org: "Mangayarkarasi College of Engineering, Madurai", duration: "06.01.2017 - 30.06.2022" }
    ],
    metrics: {
      citationsScopus: 51,
      citationsCrossRef: 45,
      hIndex: 4,
      journals: 10,
      bookChapters: 0,
      conferences: 12,
      coauthors: 14,
      altmetrics: []
    },
    projects: [],
    patents: [
      {
        title: "System And Model For Clinical Decision Support System For Risk Categorization Using Machine Learning",
        inventors: "M. Ramnath, S. Selva Birunda, B. Revathi",
        number: "202341084874",
        status: "Filed & Published",
        date: "2023-12-12",
        filedDate: "2023-12-12",
        org: "RAMCO INSTITUTE OF TECHNOLOGY"
      }
    ],
    honours: [],
    memberships: [
      { body: "IAENG", details: "Life Member (251514)", year: "-" },
      { body: "ISTE", details: "Life Member (LM 135797)", year: "-" }
    ],
    journalPubs: [
      "B.Revathi, C.UshaRani, 'Rainfall Prediction Using Machine Learning Classification Algorithms', International Journal of Creative Research Thoughts, Volume: 09, Issue No: 01, Jan 2021.",
      "B.Revathi, S.Sameera Begum, S.Kalaivani, M.Akshaya 'An Optimization Framework for Mortality Predictions in Imbalanced High-Dimensional ICU Big data', International Research Journal of Modernization In Emerging Technology and Science, Volume: 02, Issue No: 03, March 2020.",
      "B.Revathi, S.Elancheelan, R. Sathish, 'Detection of disorders in Plant Leaf using Machine Learning', International Research Journal of Modernization In Emerging Technology and Science, Volume: 02, Issue No: 03, March 2020.",
      "P.Anushya, P.Jothilakshimi, S.Pavithra, B.Revathi 'New Approach from K-Nearest Neighbor Data Classification', Seventh Sense Research Group, March 2019.",
      "K.Nagalakshmi, P.Nanthini, A.Saranya, B.Revathi, 'Detect fake identities Using Machine Learning', Seventh Sense Research Group, March 2019.",
      "B.Revathi, S.Chidambaram, 'Sequential Covering Strategy Based classification Approach Using Ant Colony Optimization', International Journal of Innovative Research in Science, Engineering and Technology (Scopus Indexed), Volume: 03, Issue No: 03, March 2014.",
      "Selva Birunda S, Nagaraj P, Jency A Jebamani B, Revathi B, 'A Structured Analysis on IPL 2022 matches by approaching various Data Visualization and Analytics', 2023 International Conference on Computer Communication and Informatics (ICCCI), Coimbatore, India, 2023.",
      "Revathi B, Kezial Elizabeth. S. K, Nagaraj P, Selva Birunda S, Nithya.D, 'Particle Swarm Optimization based Detection of Diabetic Retinopathy using a Novel Deep CNN', 2023 third IEEE International Conference on Artificial Intelligence and Smart Energy (ICAIS), Coimbatore, India, 2023.",
      "Revathi, B., Usharani, C., Elizabeth, S. K., Nagaraj, P., & Nithya, D. (2024, April). Deep Learning Classification Techniques on Detecting Diabetic Retinopathy Dataset. 2024 International Conference on Inventive Computation Technologies (ICICT).",
      "Usharani C, Revathi, B., Selvapandian, A., & Elizabeth, S. K. (2024). Lung Cancer Detection in CT Images Using Deep Learning Techniques: A Survey Review. EAI Endorsed Transactions on Pervasive Health and Technology."
    ],
    conferencePubs: [
      "Sequential Covering Strategy Based classification Approach Using Ant Colony Optimization, ICIET’14, K.L.N College of Engineering, Madurai, 2014.",
      "Detect Fake Identities Using Machine Learning, ICTER’19, Mangayarkarasi College of Engineering, Madurai, 2019.",
      "New Approach from K-Nearest Neighbor Data Classification, ICTER’19, Mangayarkarasi College of Engineering, Madurai, 2019.",
      "Emergency Vehicle Assistance Using Android Application, ICRACIA’21, Kumarasamy College of Engineering, Karur, 2021.",
      "A Structured Analysis on IPL 2022 matches by approaching various Data Visualization and Analytics, ICCCI, Sri Shakthi Institute of Engineering and Technology, 2023.",
      "Particle Swarm Optimization based Detection of Diabetic Retinopathy using a Novel Deep CNN, ICAIS, JCT College of Engineering, 2023.",
      "Analysis of Breast Cancer Using Novel Machine and Deep Learning Approach, ICRTICT’24, St. Peter’s College of Engineering and Technology, 2024.",
      "Improving Classification Accuracy using feature Selection Techniques, VISION’14, Government College of Engineering, Tirunelveli, 2014.",
      "Robotics, Artificial Intelligence and Machine Learning, RVS Educational Trust’s Group of Institutions, Dindugul, 2019.",
      "Detection of disorders in Plant Leaf using Machine Learning, SCAC’20, PSNA College of Engineering, Dindugul, 2020.",
      "An Optimization Framework for Mortality Predictions in Imbalanced High-Dimensional ICU Big data, SCAC’20, PSNA College of Engineering, Dindugul, 2020.",
      "IOT Enabled Automated Effective Incubator System with sub Bug System for child caring, NCRTCS’24, SRM Madurai College of Engineering and Technology, Madurai, 2024."
    ]
  },
  "usharani": {
    name: "MRS.C.USHARANI M.E.",
    designation: "Assistant Professor",
    department: "Artificial Intelligence and Data Science",
    email: "usharanic@ritrjpm.ac.in",
    secondaryEmail: "",
    mobile: "7845840338 / 9751653478",
    image: resolveLocalScrapedImage("https://www.ritrjpm.ac.in/gallery1/468/239_usharani_AD.jpg"),
    office: 'RIT Campus, Department of AI & DS',
    bioSummary: "Pursuing her Ph.D. with active research interests in Deep Learning and Federated Learning, she contributes to engineering education and advanced research projects.",
    researchAreas: ["Deep Learning", "Federated Learning"],
    socials: [
      { label: 'Vidwan Profile', url: "https://vidwan.inflibnet.ac.in/profile/390511" },
      { label: 'ResearchGate', url: "https://www.researchgate.net/profile/Usharani-c" },
      { label: 'ORCID ID', url: "https://orcid.org/0009-0009-1075-7019" }
    ],
    pdfUrl: "https://www.ritrjpm.ac.in/profile/_C.USHARANI_BIODATA-1.pdf",
    education: [
      { degree: "Ph.D (Pursuing)", field: "Information and Communication Engineering", university: "Anna University, Chennai", year: "Pursuing" },
      { degree: "M.E", field: "Computer Science and Engineering", university: "K.L.N College of Information Technology, Sivagangai / Anna University, Chennai", year: "2015" },
      { degree: "B.Tech", field: "Information Technology", university: "Velammal College of Engineering, Madurai / Anna University, Chennai", year: "2012" }
    ],
    experience: [
      { role: "Assistant Professor", org: "Ramco Institute of Technology, Rajapalayam", duration: "17.05.2023 - Present" },
      { role: "Assistant Professor", org: "Mangayarkarasi College of Engineering, Madurai", duration: "03.07.2019 - 31.03.2023" }
    ],
    metrics: {
      citationsScopus: 0,
      citationsCrossRef: 0,
      hIndex: 1,
      journals: 4,
      bookChapters: 0,
      conferences: 7,
      coauthors: 8,
      altmetrics: []
    },
    projects: [],
    patents: [],
    honours: [
      { title: "Anna University Rank", body: "Secured Anna University 41st Rank in M.E., Computer Science and Engineering for the Academic year 2014-2015.", year: "2015" },
      { title: "School First Rank", body: "Secured School first in SSLC and received best student award.", year: "2008" }
    ],
    memberships: [
      { body: "IAENG", details: "Member (253446)", year: "-" }
    ],
    journalPubs: [
      "B. Revathi, C. Usharani, S. K. Kezial Elizabeth, N. P and D. Nithya, 'Deep Learning Classification Techniques on Detecting Diabetic Retinopathy Dataset', 2024 International Conference on Inventive Computation Technologies (ICICT), Lalitpur, Nepal, 2024.",
      "C.Usharani, B.Revathi, A.Selvapandian, & S.K.Elizabeth, 'Lung Cancer Detection in CT Images Using Deep Learning Techniques: A Survey Review', EAI Endorsed Transactions on Pervasive Health and Technology, 10, 2024.",
      "I. Anantraj, B. Umarani, C. Karpagavalli, C.Usharani and S. J. Lakshmi, 'Quantum Computing\\'s Double-Edged Sword Unravelling the Vulnerabilities in Quantum Key Distribution for Enhanced Network Security', 2023 International Conference on Next Generation Electronics (NEleX), Vellore, India, 2023.",
      "B.Revathi, C.Usharani, 'Rainfall Prediction Using Machine Learning Classification Algorithms', International Journal of Creative Research Thoughts, Volume: 09, Issue No: 01, Jan 2021."
    ],
    conferencePubs: [
      "IOT Enabled Automated Effective incubator system with sub bag system for child caring, NCON’24, SRM Madurai College of Engineering and Technology, 2024.",
      "Automatic Detection of Covid 19 Lung infection in CT images, ICRACIA’21, Kumarasamy College of Engineering, Karur, 2021.",
      "Conference Presentation, SCAC’20, PSNA college of Engineering and Technology, Dindigul, 2020.",
      "Augmented Reality and deep learning with its application in medical diagnosis, ICITR’19, Karpagam College of Engineering, Coimbatore, 2019.",
      "Optimized of energy and Message Overheads in WSN Using Grid Communication, ICIESMS’15, Vickram College of Engineering, Enathi, 2015.",
      "Analysis of Data mining Techniques, ICETET, 14, Pandian Saraswathi Yadhav Engineering College, Sivagangai, 2014.",
      "Survey on Tree Clustered structured based Data aggregation Techniques in WSN, ICDASDC’14, K.L.N. College of Information Technology, Sivagangai, 2014."
    ]
  },
  "muthueshwaran": {
    name: "MR. R. MUTHU ESHWARAN M.E. (PH.D.)",
    designation: "Assistant Professor",
    department: "Artificial Intelligence and Data Science",
    email: "muthueshwaran@ritrjpm.ac.in",
    secondaryEmail: "mailtorme@gmail.com",
    mobile: "+91-7092884289",
    image: resolveLocalScrapedImage("https://www.ritrjpm.ac.in/gallery1/468/299_AD_MuthuEshwaran.jpg"),
    office: 'RIT Campus, Department of AI & DS',
    bioSummary: "With active research interests in Artificial Intelligence, Machine Learning, and Deep Learning, he contributes to engineering education and advanced research projects.",
    researchAreas: ["Artificial Intelligence", "Machine Learning", "Deep Learning"],
    socials: [
      { label: 'Google Scholar', url: "https://scholar.google.com/citations?user=N0DVC7YAAAAJ&hl=en" },
      { label: 'ORCID ID', url: "https://orcid.org/0000-0002-4303-5428" }
    ],
    pdfUrl: "https://www.ritrjpm.ac.in/profile/_MUTHUESHWARANR_faculty_profile.pdf",
    education: [
      { degree: "Ph.D (pursuing)", field: "Information and Communication Engineering", university: "Anna University", year: "Pursuing" },
      { degree: "M.E", field: "Computer Science and Engineering", university: "Kamaraj College of Engineering and Technology, Virudhunagar", year: "2023" },
      { degree: "B.E", field: "Computer Science and Engineering", university: "Kamaraj College of Engineering and Technology, Virudhunagar", year: "2020" }
    ],
    experience: [
      { role: "Assistant Professor", org: "Ramco Institute of Technology, Rajapalayam", duration: "14.08.2024 - Present" },
      { role: "Assistant Professor", org: "AAA College of Engineering and Technology, Sivakasi", duration: "07.06.2024 - 13.08.2024" }
    ],
    metrics: {
      citationsScopus: 121,
      citationsCrossRef: 110,
      hIndex: 4,
      journals: 4,
      bookChapters: 0,
      conferences: 2,
      coauthors: 9,
      altmetrics: []
    },
    projects: [],
    patents: [],
    honours: [
      { title: "NPTEL Soft Skills Elite", body: "Completed NPTEL Online Certification Course on 'Soft Skills' and secured Elite Certificate.", year: "2023" },
      { title: "Infosys DL Certification", body: "Completed 'Deep Learning for Developers' certification course on Infosys Springboard.", year: "2023" }
    ],
    memberships: [
      { body: "International Association of Engineers (IAENG)", details: "Member ID: 376815", year: "-" }
    ],
    journalPubs: [
      "R. Muthu Eshwaran, 'Harnessing the Potential of Bellamya eburnea Shell-Derived Nanoparticles Through Electro-mechanical Optimization in the Performance of PCL Bio-composites: A Green Insulation Revolution', Waste and Biomass Valorization, Springer Netherlands, Vol. 15, Issue 4, September 2023.",
      "R. Muthu Eshwaran, 'Multi-analytical investigation of the physical, chemical, morphological, tensile, and structural properties of Indian mulberry (Morinda tinctoria) bark fibers', Heliyon, Elsevier, Vol. 9, Issue 11, November 2023.",
      "R. Muthu Eshwaran, 'Comparative investigation of imaging techniques, pre-processing and visual fault diagnosis using artificial intelligence models for solar photovoltaic system – A comprehensive review', Measurement, Elsevier, Vol. 232, June 2024.",
      "R. Muthu Eshwaran, 'Energy Monitoring for Renewable Energy System Using Machine Learning Algorithms', Recent Advances in Electrical & Electronic Engineering, Bentham Science, Vol. 17, Issue 10, October 2023."
    ],
    conferencePubs: [
      "Assortment of influencing parameters for bifacial solar photovoltaic module with ecofriendly reflective material using Placket Burman approach, First International Conference on Research and Innovation (IECRI 2022), Delta University, Egypt, November 2022.",
      "A technical review on the Short term load forecasting using Machine Learning Algorithms, National Conference on Industry 5.0: Emerging Technology to Transform the Globe (NCCI 2023), NITTTR Chennai, April 2023."
    ]
  },
  "angelhepzibah": {
    name: "MRS. R. ANGEL HEPZIBAH M.E.",
    designation: "Assistant Professor – Grade II",
    department: "Artificial Intelligence and Data Science",
    email: "angel@ritrjpm.ac.in",
    secondaryEmail: "rangelhepzibah@gmail.com",
    mobile: "9025464900",
    image: resolveLocalScrapedImage("https://www.ritrjpm.ac.in/gallery1/468/297_AD_ANGEL.jpg"),
    office: 'RIT Campus, Department of AI & DS',
    bioSummary: "Pursuing her Ph.D. with over 18 years of academic experience, her research interests include the Internet of Things, Wireless Sensor Networks, and Computer Networking.",
    researchAreas: ["Internet of Things", "Wireless Sensor Networks", "Networking"],
    socials: [
      { label: "Vidwan ID: 489957", url: "https://ritrjpm.irins.org/profile/489957" }
    ],
    pdfUrl: "https://www.ritrjpm.ac.in/profile/_Mrs.R.AngelHepzibah_faculty_profile.pdf",
    education: [
      { degree: "Ph.D (Pursuing)", field: "Information and Communication Engineering", university: "Anna University, Chennai", year: "Pursuing" },
      { degree: "M.E", field: "Computer Science and Engineering", university: "Anna University, Trichy", year: "2010" },
      { degree: "B.E", field: "Computer Science and Engineering", university: "CSI Institute of Technology, Thovalai", year: "2005" }
    ],
    experience: [
      { role: "Assistant Professor – Grade II", org: "Ramco Institute of Technology, Rajapalayam", duration: "09.08.2024 - Present" },
      { role: "Assistant Professor", org: "Jayaraj Annapackiam CSI College of Engineering, Nazareth", duration: "03.08.2009 - 08.08.2024" },
      { role: "Lecturer", org: "Infant Jesus College of Engineering, Keelavallanadu", duration: "09.01.2007 - 22.07.2009" },
      { role: "Lecturer", org: "Dr. G. U. Pope College of Engineering, Sawyerpuram", duration: "30.01.2006 - 08.01.2007" }
    ],
    metrics: {
      citationsScopus: 0,
      citationsCrossRef: 0,
      hIndex: 1,
      journals: 14,
      bookChapters: 0,
      conferences: 3,
      coauthors: 12,
      altmetrics: []
    },
    projects: [],
    patents: [
      {
        title: "Blockchain Based Secure Communication Protocol for IOT Device",
        inventors: "Dr. N. Nisha Rosebel, Mrs. B. Jafny Benshia, Mrs. R. Angel Hepzibah, Mrs. G. Princely Linda Mary, Mr. I. Solomon, Mrs. K. M. Annammal, Mrs. A. Jenifus Selvarani & Mr. J. Viniston Suthahar",
        number: "202441078478",
        status: "Published",
        date: "2024-10-25",
        filedDate: "2024-10-16",
        org: "RAMCO INSTITUTE OF TECHNOLOGY"
      }
    ],
    honours: [],
    memberships: [],
    journalPubs: [
      "Dr. E. Mariappan, Mr. D. Asir, Mrs. R. Angel Hepzibah, Dr. S. Ramasamy, Prof. A. George Klington, 'A Review Paper on Web of Things & its Smart Applications', Journal of Information and Computational Science, Volume 12 – Issue 4 2022 (ISSN:1548 – 7741)",
      "Mrs. R. Angel Hepzibah, Dr. Roselin, Dr. E. Mariappan, Mr. D. Asir and Dr. S. Ramasamy, 'A Survey of Privacy in Internet of Things', Journal of Information and Computational Science, Volume 12 – Issue 4 2022 (ISSN:1548 – 7741)",
      "Dr. E. Mariappan, Mr. D. Asir, Mrs. R. Angel Hepzibah, Prof. A. George Klington and Mrs. R. Kavitha, 'A survey on IoT: Security Threats and Solution Architectures', Journal of Information and Computational Science, Volume 12 – Issue 4 2022 (ISSN:1548 – 7741)",
      "Mrs. R. Angel Hepzibah, Dr. S. Ramasamy, Dr. E. Mariappan, Mr. D. Asir and Prof. George Klington, 'Overview on Internet of Things', Journal of Information and Computational Science, Volume 12 – Issue 4 2022 (ISSN:1548 – 7741)",
      "Dr. E. Mariappan, Mr. D. Asir, Mrs. R. Angel Hepzibah, Dr. S. Ramasamy and Prof. George Klington, 'Data Integration on Sematic Web Technologies', Journal of Information and Computational Science, Volume 12 – Issue 4 2022 (ISSN:1548 – 7741)",
      "Dr. E. Mariappan, Mr. D. Asir, Mrs. R. Angel Hepzibah, Prof. A. George Klington and Mrs. C. Thangam, 'Enhancing the Lifetime of Wireless Sensor Network using Efficient Clustering Methods', Journal of Information and Computational Science, Volume 12 – Issue 4 2022 (ISSN:1548 – 7741)",
      "Dr. E. Mariappan, Mr. D. Asir, Mrs. R. Angel Hepzibah, Mrs. C. Thangam and Dr. A. Lourdes Mary, 'Model-Driven Security Policy Enforcement Framework and its Apps Deployed in Edge Servers', Journal of Information and Computational Science, Volume 12 – Issue 4 2022 (ISSN:1548 – 7741)",
      "Dr. E. Mariappan, Mr. D. Asir, Mrs. R. Angel Hepzibah, Dr. S. Ramasamy and Mrs. A. Kavitha, 'Semantic Data Integration on the Internet of Things', Journal of Information and Computational Science, Volume 12 – Issue 4 2022 (ISSN:1548 – 7741)",
      "Mrs. R. Angel Hepzibah and Dr. E. Mariappan, 'Internet of Things (IoT) – A Survey', Journal of Emerging Technologies and Innovative Research, Volume 8 – Issue 10 October 2021 (ISSN - 2349-5162)",
      "Dr. E. Mariappan, Mr. D. Asir, Dr. T. Jasperline, Dr. P. Elamparithi, Dr. A. Jegadeesh, Dr. M. Kaliappan, Mr. M. Ramnath, Mrs. R. Angel Hepzibah, 'Enhanced Solar Plant Positionain Using Moth-Flame Optimization Technique', African Journal of Biomedical Research, pp: 4405 – 4412, October 2024.",
      "Dr. Mariappan E, Dr. Anna Lakshmi A, Amala Princeton X, Vetrivel P, Dr. Ramasamy S, Angel Hepzibah R, Dr. Kaliappan, Ramnath M, 'An Examining Cluster Behaviour Analytically Using K-means, EM and K* means Algorithm', Journal of Tianjin University Science and Technology, pp: 124 – 135, Vol: 57, Issue: 10:2024.",
      "Angel Hepzibah R, Anna Lakshmi A, Mariappan E, Kaliappan M, Sugel Anandh O, Amala Princeton X, Ramnath M, Karpagavalli C, 'Dragonfly Algorithm Based Approach for Solar Power Plant Optimization in IEEE 69 -Bus Network', International Journal of Science, Mathematics and Technology Learning, Volume 32, No.2, 2024.",
      "Dr. E. Mariappan, R. Angel Hepzibah, 'Analyzing Public Opinion Through Twitter Sentiment Analysis Technique', Gradiva Review Journal, PAGE NO: 190-193, 2023.",
      "Anna Lakshmi A, Ramasamy S, Mariappan E, Kaliappan M, Ramnath M, Angel Hepzibah R, 'Maximizing Solar Energy Efficiency Through Grasshopper Algorithm-Based Site Selection(Accepted)', J. Electrical Systems Vol-Issue (2024): 1-12."
    ],
    conferencePubs: [
      "Android Application for preventing crime against women, National Conference on Innovative Computing Techniques and Applications (NCICTA – 18), March 2018",
      "Low priority Congestion control for High-Speed Networks, National Conference on Advanced VLSI, Image Processing and Communication Systems (NAVIES – 11), April 2011",
      "Optimizing the cost and increasing networks using EBRP, CSIR Sponsored National Conference on Data Mining and Image Processing. (NCDMIP’10), February 2010"
    ]
  },
  "logapriya": {
    name: "MS. V. LOGAPRIYA M.E.",
    designation: "Assistant Professor",
    department: "Artificial Intelligence and Data Science",
    email: "logapriya@ritrjpm.ac.in",
    secondaryEmail: "logapriyaragavan@gmail.com",
    mobile: "9445968059",
    image: resolveLocalScrapedImage("https://www.ritrjpm.ac.in/gallery1/468/298_AD_LOGAPRIYA.jpg"),
    office: 'RIT Campus, Department of AI & DS',
    bioSummary: "With active research interests in Machine Learning, Internet of Things, and Medical Image Processing, she contributes to engineering education and advanced research projects.",
    researchAreas: ["Machine Learning", "Internet of Things", "Medical Image Processing"],
    socials: [
      { label: 'ORCID ID', url: "https://orcid.org/0009-0004-8581-3197" }
    ],
    pdfUrl: "https://www.ritrjpm.ac.in/profile/_Ms.V.Logapriya_Faculty_profile.pdf",
    education: [
      { degree: "M.E", field: "Computer Science and Engineering", university: "P.S.R. Engineering College / Anna University, Chennai", year: "2022" },
      { degree: "B.E", field: "Computer Science and Engineering", university: "P.S.R.Rengasamy College of Engineering for Women / Anna University, Tirunelveli", year: "2019" }
    ],
    experience: [
      { role: "Assistant Professor", org: "Ramco Institute of Technology, Rajapalayam", duration: "31.07.2024 - Present" },
      { role: "Assistant Professor", org: "P.S.R. Engineering College, Sivakasi", duration: "01.07.2022 - 10.06.2024" }
    ],
    metrics: {
      citationsScopus: 0,
      citationsCrossRef: 0,
      hIndex: 1,
      journals: 2,
      bookChapters: 0,
      conferences: 0,
      coauthors: 2,
      altmetrics: []
    },
    projects: [],
    patents: [],
    honours: [
      { title: "University First Rank", body: "Secured 1st Rank in University examinations in M.E., Computer Science and Engineering.", year: "2022" },
      { title: "FDP Organizer", body: "Organized a Five Days Faculty Development Program under ATAL Academy.", year: "2023" }
    ],
    memberships: [],
    journalPubs: [
      "V. Logapriya, 'Skin disease detection using region based convolutional neural networks', International Research Journal of Modernization in Engineering Technology and Science, Volume 06, Number 1, January 2024.",
      "V. Logapriya, 'Effective analysis in health care monitoring system', International Journal of Creative Research Thoughts, February 2022."
    ],
    conferencePubs: []
  },
  "ramana": {
    name: "MRS.R.RAMANA M.TECH.B.TECH. PHD(PURSUING)",
    designation: "Assistant Professor",
    department: "Artificial Intelligence and Data Science",
    email: "ramana@ritrjpm.ac.in",
    secondaryEmail: "",
    mobile: "7558131141",
    image: resolveLocalScrapedImage("https://www.ritrjpm.ac.in/gallery1/468/284_Ramana.jpg"),
    office: 'RIT Campus, Department of AI & DS',
    bioSummary: "With active research interests in Computer Vision, Deep Learning, and 3D Object Recognition, she contributes to engineering education and advanced research projects.",
    researchAreas: ["Computer Vision", "Deep Learning", "3D Object Recognition"],
    socials: [
      { label: 'ORCID ID', url: "https://orcid.org/0000-0003-4970-2938" }
    ],
    pdfUrl: "https://www.ritrjpm.ac.in/profile/_Ramana_faculty_profile.pdf",
    education: [
      { degree: "Ph.D (pursuing)", field: "Computer Science and Engineering", university: "Kalasalingam Academy of Research and Education", year: "Pursuing" },
      { degree: "M.Tech", field: "Computer Science and Engineering", university: "Kalasalingam Academy of Research and Education", year: "2018" },
      { degree: "B.Tech", field: "Computer Science and Engineering", university: "Kalasalingam University", year: "2016" }
    ],
    experience: [
      { role: "Assistant Professor", org: "Ramco Institute of Technology, Rajapalayam", duration: "2024 - Present" }
    ],
    metrics: {
      citationsScopus: 0,
      citationsCrossRef: 0,
      hIndex: 1,
      journals: 5,
      bookChapters: 0,
      conferences: 3,
      coauthors: 5,
      altmetrics: []
    },
    projects: [],
    patents: [
      {
        title: 'SMART PROSTHETIC ARM USING ARTIFICIAL INTELLIGENCE AND ELECTROMYOGRAPHY SIGNALS',
        inventors: 'M. Kaliappan, S. Selva Birunda, R. Ramana',
        number: 'Patent No. 132616',
        status: 'Published',
        date: '2025-12-22',
        filedDate: '2025-12-01',
        org: 'RAMCO INSTITUTE OF TECHNOLOGY'
      }
    ],
    honours: [
      { title: "Digital Dreamz Coordinator", body: "Successfully Coordinated Digital Dreamz’ 15 at Kalasalingam University.", year: "2015" },
      { title: "Cambridge English ESOL", body: "Achieved Council of Europe Level A2 in Cambridge English Entry Level Certificate in ESOL International (Entry 2) (Business).", year: "2015" },
      { title: "ICMC Conference Organizer", body: "Organized ICMC International level conference at Kalasalingam Academy of Research and Education.", year: "2018" },
      { title: "NPTEL Certifications", body: "Completed NPTEL Certification Courses in Cloud Computing and Artificial Intelligence with 70%.", year: "2018" },
      { title: "EMC Cloud Certification", body: "Successfully completed EMC Cloud Computing Certification Course.", year: "2018" }
    ],
    memberships: [],
    journalPubs: [
      "Ramana. R, B.S.Murugan, 'YOLOv4Tiny: Bearing Angle Based Pose Estimation and Semantic Segmentation For 3D Object Detection From LiDAR Point Cloud & RGB-D Data', Wireless Personal Communications (Under Review), 2021.",
      "Ramana. R, B.S.Murugan, 'A novel model for eliminating overlapping issues in 3D object recognition using dove swarm optimization based light GBM', International Journal of Information Technology (Singapore), 2023 (Scopus Indexed).",
      "Ramana. R, B.S.Murugan, 'An Efficient Pelican Optimization based CNN BiLSTM to Detect and Classify 3D Objects', IEEE International Conference on Knowledge Engineering and Communication Systems (ICKES 2022) (Scopus Indexed).",
      "Ramana. R, B.S.Murugan, 'Detection of multiple small 3D Objects using point cloud images by ASP Network 3D Object Detection Model', Design Engineering, 2021.",
      "Selva Birunda S, Nagaraj P, Krishna Narayanan S, Muthamil Sudar K, Muneeswaran V & Ramana R, 'Fake Image Detection in Twitter using Flood Fill Algorithm and Deep Neural Networks', 12th International Conference on Cloud Computing, Data Science & Engineering (Confluence 2022) (Scopus Indexed)."
    ],
    conferencePubs: [
      "Detection of multiple small 3D objects using point cloud images by ASP Network 3D Object Detection Model, ICACST’21, Online, 2021.",
      "Virtual reality, P.E.T. Engineering College, 2017.",
      "Secure Multicast Group Communication for IOT Applications using WSN, International Conference on Emerging Trends in Computing, Communication and Automation, Srividhya College of Engineering, 2018."
    ]
  },
  "vetrivel": {
    name: "MR. P. VETRIVEL M.E.",
    designation: "Assistant Professor",
    department: "Artificial Intelligence and Data Science",
    email: "vetrivel@ritrjpm.ac.in",
    secondaryEmail: "vetrilev17@gmail.com",
    mobile: "9600211610",
    image: resolveLocalScrapedImage("https://www.ritrjpm.ac.in/gallery1/468/289_Vetrivel.jpg"),
    office: 'RIT Campus, Department of AI & DS',
    bioSummary: "With active research interests in Network Security, Cryptography, Internet of Things, and Deep Learning, he contributes to engineering education and advanced research projects.",
    researchAreas: ["Network Security", "Cryptography", "Internet of Things", "Deep Learning"],
    socials: [],
    pdfUrl: "https://www.ritrjpm.ac.in/profile/_Vetrivel_Profile.pdf",
    education: [
      { degree: "M.E", field: "Computer Science and Engineering", university: "Mepco Schlenk Engineering College, Sivakasi", year: "2019" },
      { degree: "B.E", field: "Computer Science and Engineering", university: "AAA College of Engineering and Technology, Sivakasi", year: "2017" }
    ],
    experience: [
      { role: "Assistant Professor", org: "AAA College of Engineering & Technology, Sivakasi", duration: "23.06.2022 - 20.07.2024" },
      { role: "Assistant Professor", org: "Sree Sowdambika College of Engineering, Aruppukottai", duration: "02.03.2020 - 15.06.2022" }
    ],
    metrics: {
      citationsScopus: 0,
      citationsCrossRef: 0,
      hIndex: 1,
      journals: 3,
      bookChapters: 0,
      conferences: 6,
      coauthors: 3,
      altmetrics: []
    },
    projects: [],
    patents: [],
    honours: [
      { title: "BEC Vantage Certification", body: "Completed Business English Certificate Vantage (BEC Vantage) with Grade B.", year: "2017" },
      { title: "Angular Developer Certification", body: "Completed 'ANGULAR- beginner to advanced' certification program on Udemy.", year: "2020" }
    ],
    memberships: [
      { body: "International Association of Engineers (IAENG)", details: "Member ID: 325234", year: "-" }
    ],
    journalPubs: [
      "P. Vetrivel, 'An efficient centralized group key management protocol for secure multicast communication', International Journal of Scientific Research in Engineering and Management, Volume 05, Issue 03, March 2021.",
      "P. Vetrivel, 'Detection of covid-19 based on automated chest image using semantic segmentation', International Journal of Scientific Research in Engineering and Management, Volume 05, Issue 03, March 2021.",
      "P. Vetrivel, 'Secure Message Transmission Using Centralized Group Key Distribution Protocol', International Journal of Research in Applied Science and Engineering Technology, Volume 10, Issue VI, June 2022."
    ],
    conferencePubs: [
      "Certificate less public key encryption and decryption scheme, International Conference at Karpagam College of Engineering and Technology, Coimbatore, January 2019.",
      "An efficient centralized group key management protocol for secure multicast communication, International Conference at Sri Vidya College of Engineering and Technology, Virudhunagar, March 2019.",
      "Detection of Lymphoma from The Bone Marrow Microscope Images Using CNN, International Conference at AAA College of Engineering and Technology, Sivakasi, April 2023.",
      "Decentralized Voting System Using Blockchain, International Conference at AAA College of Engineering and Technology, Sivakasi, April 2023.",
      "An Enhanced Super Resolution Approach to Image Resolution Using Deep Learning, International Conference at AAA College of Engineering and Technology, Sivakasi, April 2023.",
      "Fake News Detection Using Machine Learning, International Conference at AAA College of Engineering and Technology, Sivakasi, April 2023."
    ]
  },
  "pradeepha": {
    name: "S.PRADEEPHA M.E.",
    designation: "Assistant Professor",
    department: "Artificial Intelligence and Data Science",
    email: "pradeepha@ritrjpm.ac.in",
    secondaryEmail: "pradeepha@hotmail.com",
    mobile: "9488487499",
    image: resolveLocalScrapedImage("https://www.ritrjpm.ac.in/gallery1/468/285_Pradeepha.jpg"),
    office: 'RIT Campus, Department of AI & DS',
    bioSummary: "With active research interests in Web Services, Semantic Web Services Discovery, Data Mining, and Mobile Application Development, she contributes to engineering education and advanced research projects.",
    researchAreas: ["Web Services", "Semantic Web Services", "Data Mining", "Mobile Application Development"],
    socials: [],
    pdfUrl: "https://www.ritrjpm.ac.in/profile/_pradeepha.pdf",
    education: [
      { degree: "M.E", field: "Computer Science and Engineering", university: "Anna University Regional Centre, Coimbatore", year: "2014" },
      { degree: "B.Tech", field: "Information Technology", university: "Kalasalingam University", year: "2012" }
    ],
    experience: [
      { role: "Assistant Professor", org: "Ramco Institute of Technology, Rajapalayam", duration: "01.07.2024 - Present" },
      { role: "Associate Developer", org: "Access Healthcare, Chennai", duration: "15.02.2017 - 10.05.2019" }
    ],
    metrics: {
      citationsScopus: 0,
      citationsCrossRef: 0,
      hIndex: 1,
      journals: 1,
      bookChapters: 0,
      conferences: 2,
      coauthors: 2,
      altmetrics: []
    },
    projects: [],
    patents: [],
    honours: [
      { title: "IBM Certification", body: "Completed IBM certification course on TIVOLI Directory Server V6.1.", year: "2011" },
      { title: "Asp.Net Inplant Training", body: "Completed Asp.Net inplant training program at HCL Madurai.", year: "2010" },
      { title: "Web Development Training", body: "Completed Web Development inplant training program at N-Dot Technologies, Coimbatore.", year: "2010" }
    ],
    memberships: [],
    journalPubs: [
      "S.Pradeepha, 'Augmenting the SWS Discovery by Categorization of Web service', International Journal of Advanced Research in Computer Science and Technology (IJARCST), Volume 2, Issue 1, January-March 2014."
    ],
    conferencePubs: [
      "Augmenting the SWS Discovery by Categorization of Web Service, International Conference on Hi-Tech Trends in Emerging Computational Technologies (ICECT 14), Sethu Institute of Technology, 2014.",
      "Enhancing the SWS Discovery by classify the Web Services, International Conference on Simulations in Computing Nexus (ICSCN 14), Coimbatore Institute of Engineering and Technology, 2014."
    ]
  },
  "santhikala": {
    name: "MRS. M. SANTHIKALA M.E.",
    designation: "Assistant Professor",
    department: "Artificial Intelligence and Data Science",
    email: "santhikala@ritrjpm.ac.in",
    secondaryEmail: "santhisss1983@gmail.com",
    mobile: "9042223616",
    image: resolveLocalScrapedImage("https://www.ritrjpm.ac.in/gallery1/468/286_Santhikala.jpg"),
    office: 'RIT Campus, Department of AI & DS',
    bioSummary: "With active research interests in Machine Learning, Big Data Analytics, Blockchain, and Cyber Security, she contributes to engineering education and advanced research projects.",
    researchAreas: ["Machine Learning", "Big Data Analytics", "Blockchain", "Cyber Security"],
    socials: [
      { label: 'Vidwan ID', url: "https://vidwan.inflibnet.ac.in/profile/545058" }
    ],
    pdfUrl: "https://www.ritrjpm.ac.in/profile/_santhikala_faculty_profile.pdf",
    education: [
      { degree: "M.E", field: "Computer Science and Engineering", university: "Thiruvalluvar College of Engineering and Technology, Vandavasi / Anna University", year: "2011" },
      { degree: "B.E", field: "Computer Science and Engineering", university: "Anand Institute of Higher Technology, Chennai / Anna University", year: "2009" }
    ],
    experience: [
      { role: "Assistant Professor", org: "Ramco Institute of Technology, Rajapalayam", duration: "05.07.2024 - Present" },
      { role: "Assistant Professor", org: "Theni Kammavar Sangam College of Technology, Theni", duration: "28.11.2022 - 01.07.2024" },
      { role: "Assistant Professor", org: "Anand Institute of Higher Technology, Chennai", duration: "19.01.2012 - 29.05.2015" }
    ],
    metrics: {
      citationsScopus: 0,
      citationsCrossRef: 0,
      hIndex: 1,
      journals: 0,
      bookChapters: 0,
      conferences: 3,
      coauthors: 2,
      altmetrics: []
    },
    projects: [],
    patents: [],
    honours: [
      { title: "Blockchain & Cryptocurrencies Certification", body: "Completed Blockchain and Cryptocurrencies certification course by Mind Luster.", year: "2024" },
      { title: "UiPath RPA Certification", body: "Completed Naan Mudhalvan Robotic Process Automation Foundation Course provided by UiPath.", year: "2024" },
      { title: "Hyperledger Fabric Fundamentals", body: "Completed Hyperledger Fabric Fundamentals (JavaScript) Program at Kerala Blockchain Academy.", year: "2024" },
      { title: "Mathematics for Computer Science", body: "Completed Mathematics for Computer Science course from Edx - University of London.", year: "2024" },
      { title: "Cyber Security Certification", body: "Completed Cyber Security certification from Tech Mahindra Foundation.", year: "2024" },
      { title: "Linear Algebra Certification", body: "Completed Linear Algebra - Foundations to Frontiers from EDX - The University of Texas Systems.", year: "2024" }
    ],
    memberships: [],
    journalPubs: [],
    conferencePubs: [
      "A study on a complete Game Testing with its approaches, Scenarios and methods, International Conference on Science and Innovative Engineering (ICSIE’16), Jawahar Engineering College, Chennai, 2016.",
      "Privacy Preserving using tuple and threshold matching in distributed systems, National Conference on Computer and Communication Infrastructure (NCCI 2011), SMK Fomra Institute of Technology, 2011.",
      "Providing authentication for Data Integrity in Wireless Sensor Network, National Conference on Frontiers of Communication and Computing (AGNICON 2013), Agni College of Technology, Chennai, 2013."
    ]
  },
}