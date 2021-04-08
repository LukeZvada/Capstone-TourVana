### TourVana
TourVana is an app for tour managers in the entertainment business that acts as a tool that allows them to easily view deal memos (contract summary), upload settlement reports, and build expense reports. For this project, I used React, Javascript, CSS, HTML,
Material UI, Chart.js, and Cloudinary. You can find a video demo here. https://www.youtube.com/watch?v=zSTCjRObvec&feature=youtu.be

### Preview
![Screenshot](TourvanaPreview.png)

### Setup
1. Clone this Repository 
2. cd into that directory 
3. Download packages: 
```
npm install
npm i --save react react-dom react-router-dom
npm install json-server
npm install @material-ui/core
npm install @material-ui/icons
npm install chart.js --save
```
4. mkdir api and touch database.json to create the database
5. Copy and paste the sample api from below into database.json 
6. Run json-server -w database.json -p 8088 from the api directory
7. In a separate terminal, run npm start from the repository directory


### Sample database
```
{
  "users": [
    {
      "id": 1,
      "firstName": "Luke",
      "lastName": "Zvada",
      "username": "lzvada",
      "password": "123"
    },
    {
      "id": 2,
      "firstName": "John",
      "lastName": "Smith",
      "username": "jsmith",
      "password": "123"
    }
  ],
  "show": [
    {
      "id": 3,
      "venueName": "The Aura",
      "city": "Portland",
      "state": "ME",
      "date": "2021-10-11",
      "userId": 1,
      "dealMemoUrl": ""
    },
    {
      "id": 4,
      "venueName": "The Fillmore",
      "city": "Phildelphia",
      "state": "PA",
      "date": "2021-10-12",
      "userId": 1,
      "dealMemoUrl": ""
    },
    {
      "venueName": "The Anthem",
      "city": "Washington",
      "state": "DC",
      "date": "2021-10-15",
      "userId": 1,
      "dealMemoUrl": "https://res.cloudinary.com/zvada/image/upload/v1600977073/lzvada/fumbesgm0idt720gd5qh.png",
      "id": 5
    },
    {
      "venueName": "Stage AE",
      "city": "Pittsburgh",
      "state": "PA",
      "date": "2021-10-16",
      "userId": 1,
      "dealMemoUrl": "https://res.cloudinary.com/zvada/image/upload/v1600977178/lzvada/jh4a2zcr9n18j12lxftq.png",
      "id": 6
    }
  ],
  "settlement": [
    {
      "attachmentUrl": "https://res.cloudinary.com/zvada/image/upload/v1600200781/lzvada/qmf4tsuuxrkqugy4kjoq.jpg",
      "showId": 3,
      "id": 1
    },
    {
      "attachmentUrl": "https://res.cloudinary.com/zvada/image/upload/v1600214040/lzvada/a1aacamg0xnroaakbigy.png",
      "showId": 5,
      "id": 2
    },
    {
      "attachmentUrl": "https://res.cloudinary.com/zvada/image/upload/v1600217565/lzvada/re86iuie48zxs1a4hgxz.png",
      "showId": 8,
      "id": 3
    },
    {
      "attachmentUrl": "https://res.cloudinary.com/zvada/image/upload/v1600264729/lzvada/l5t3xp0myfodx0zmoz8z.png",
      "showId": 6,
      "id": 4
    }
  ],
  "dealMemo": [
    {
      "id": 1,
      "showId": 1,
      "attachmentUrl": ""
    }
  ],
  "creditCardReport": [
    {
      "storeName": "Sinkers",
      "city": "Nashville",
      "state": "TN",
      "price": "165.54",
      "date": "3/23/2021",
      "userId": 2,
      "id": 3,
      "category": "travel"
    },
    {
      "storeName": "Yellow Taxi",
      "city": "New York",
      "state": "NY",
      "price": "16.06",
      "date": "2020-12-10",
      "userId": 1,
      "attachementUrl": "https://res.cloudinary.com/zvada/image/upload/v1607629541/lzvada/zwkffpjl3xnnw5x1dxme.png",
      "category": "travel",
      "id": 5
    }
  ]
}
```

