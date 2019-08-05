const axios = require('axios');

let item = "Atziri's Disfavour";
let currency = "exa";
let maxprice = 1.2;
let resultOld = [2];

function checkPrices() {
  axios.post('https://www.pathofexile.com/api/trade/search/Legion', {

      "query": {
        "status": {
          "option": "online"
        },
        "name": item,
        "stats": [{
          "type": "and",
          "filters": []
        }],
        "filters": {
          "trade_filters": {
            "filters": {
              "price": {
                "option": currency,
                "max": maxprice
              }
            }
          }
        }
      },
      "sort": {
        "price": "asc"
      }
    })
    .then(resp => {
      let data = resp.data;
      let result = data.result;
      let id = data.id;
      let string = "";
      let records;

      if (resultOld[0] == result[0]) return;
      resultOld = result;
      if (result == 0) return;
      if (result.length > 10) {
        records = 10;
      } else {
        records = result.length;
      }



      //  if (resultOld[0] == result[0]) return;
      for (i = 0; i < records; i++) {
        string += result[i] + ",";
      }
      string = string.slice(0, -1);

      axios.get(`https://www.pathofexile.com/api/trade/fetch/${string}?query=${id}`)
        .then(resp => {
          for (i = 0; i < records; i++) {
            console.log(resp.data.result[i].item.name + " " + resp.data.result[i].listing.price.amount + " " + resp.data.result[i].listing.price.currency + " " +  resp.data.result[i].listing.whisper);
          }

        })

    })
}
// checkPrices();
setInterval(function() {
  checkPrices();
}, 2000);
