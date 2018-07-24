/*-----------------
	Components 
-----------------*/

// Parent | Subreddit component containing a list of 'post' components.
// import axios from 'axios';


var subreddit = Vue.component('subreddit',{
	template: '#subreddit',
    props: ['item'],

    components: {
        receipt: Receipt
    },

	data: function () {
		return {
			// received: [],
			receipt_no: '',
			tithe: '',
			combined: '',
			name: "Clifford Beta",
			receipt: '',
			church: 'JKUSDA',
			treasurer: "Zeph Adar",
			date: '12/05/2017',
			total: '',
			tithe_shs:'',
            tithe_cts:'',
            combined_shs:'',
            combined_cts:'',
            camp_shs:'',
            camp_cts:'',
			name_1:'',
			shs_1:'',
			cts_1:'',
            name_2:'',
            shs_2:'',
            cts_2:'',
            name_3:'',
            shs_3:'',
            cts_3:'',
            name_4:'',
            shs_4:'',
            cts_4:'',
            name_5:'',
            shs_5:'',
            cts_5:'',
            name_6:'',
            shs_6:'',
            cts_6:'',
            name_7:'',
            shs_7:'',
            cts_7:'',
            name_8:'',
            shs_8:'',
            cts_8:'',
            build_shs:'',
            build_cts:'',
			url:'http://localhost/jkusda_api/contribution_report?from=20-05-2017&member_id=422'





		}
	},
    methods: {
	    fillUp: function (contributions) {


        },
	  totalier: function (contributions) {
	      total = 0;
	      counter = 1;
          for (var val in contributions){
              if(val!=="Tithe" && val!=="Combined Offering" && val!== "Church Building" && val!=="Camp Offering"){
                  // console.log("Too Bad!");
                  if (counter == 1){
                    this.name_1 = val;
                    this.shs_1 = contributions[val];
                  } else if (counter == 2){
                      this.name_2 = val;
                      this.shs_2 = contributions[val];
                  }
                  else if (counter == 3){
                      this.name_3 = val;
                      this.shs_3 = contributions[val];
                  }
                  else if (counter == 4){
                      this.name_4 = val;
                      this.shs_4 = contributions[val];
                  }
                  else if (counter == 5){
                      this.name_5 = val;
                      this.shs_5 = contributions[val];
                  }
                  else if (counter == 6){
                      this.name_6 = val;
                      this.shs_6 = contributions[val];
                  }
                  else if (counter == 7){
                      this.name_7 = val;
                      this.shs_7 = contributions[val];
                  }
                  else if (counter == 8){
                      this.name_8 = val;
                      this.shs_8 = contributions[val];
                  }
                  // else if (counter == 9){
                  //     this.name_9 = val;
                  //     this.shs_9 = contributions[val];
                  // }
                  else{
                  console.log("Error");

                  }
              }
              counter +=1
              total += parseFloat(contributions[val]);
          }
          // console.log(total)
          return total
      }  
    },

    // created: function() {
    //     // axios.defaults.headers.post['api-key'] = 'KA83T9iQm4oK0Jjcnid4X7AQOvxFmwl5';
    //     // this.$http.post(url:'http:localhost/jkusda_api/contribution_report/',
		// 	var datea = {
    //         from: '2017-05-12',
    //         // lastName: 'Flintstone'
    //     }
    //     axios({
    //         method: 'post',
    //         url: this.url,
    //         data: JSON.stringify(datea)
    //     })
    //         .then(function (response) {
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    //     // this.$http.get("https://www.reddit.com/r/" + this.name + "/top.json?limit=5")
    //     //     .then(function (resp) {
    //     //         this.posts = resp.data.data.children;
    //     //     });
    //
    // },




        // Pushes posts to the server when called.
        // postPost() {
        //     axios.post(`http://jsonplaceholder.typicode.com/posts`, {
        //         body: this.postBody
        //     })
        //         .then(response => {})
        // .catch(e => {
        //         this.errors.push(e)
        // })
        //
        // },
    computed: function () {
        this.total = this.tithe+this.combined
    }
});


var Receipt = Vue.component('receipt', {
    template: "#receipt",
    props: ['item'],

});


var post = Vue.component('post', {
	template: "#post",
	props: ['item'],
	methods: {
		getImageBackgroundCSS: function(img) {
			if(img && img!='self' && img!='nsfw') {
				return 'background-image: url(' + img + ')';	
			}
			else {
				return 'background-image: url(assets/img/placeholder.png)';	
			}
		}		
	}
});


var summaryredit = Vue.component('summaryreddit', {
    template: '#summaryreddit',
    props: ['item'],
    data: function () {
        return {

        }
    }

});

/*-----------------
   Custom filters 
-----------------*/


// Filter that transform text to uppercase.
// Vue.filter('uppercase', function(value) {
//     return value.toUpperCase();
// });
//
//
// // Filter for cutting off strings that are too long.
// Vue.filter('truncate', function(value) {
// 	var length = 60;
//
// 	if(value.length <= length) {
// 		return value;
// 	}
// 	else {
// 		return value.substring(0, length) + '...';
// 	}
// });


/*-----------------
   Initialize app 
-----------------*/

// new Vue({
// 	el: '#app',
//     mounted() {
// // axios.defaults.headers.post['api-key'] = 'KA83T9iQm4oK0Jjcnid4X7AQOvxFmwl5';
// // this.$http.post(url:'http:localhost/jkusda_api/contribution_report/',
//         var datea = {
//             from: '2017-05-12',
// // lastName: 'Flintstone'
//         }
//         axios({
//             method: 'post',
//             url: this.url,
//             data: JSON.stringify(datea)
//         })
//             .then(function (response) {
//                 this.received = response.data.message
//                 console.log(this.received);
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
// // this.$http.get("https://www.reddit.com/r/" + this.name + "/top.json?limit=5")
// //     .then(function (resp) {
// //         this.posts = resp.data.data.children;
// //     });
//
//     },
// 	data:{
// 			received:[]
// 	}
// });

const vm = new Vue({
    el: '#app',
    data: {
        received: [],
        summary:[],
        date:'01-01-2017',
        total:0
    },
    created() {
        axios.get("http://localhost/jkusda_api/contribution_report?from="+this.date)
            .then(response => {this.received = response.data.message
            console.log(response)
        console.log(this.received)
            })
        axios.get("http://localhost/jkusda_api/contribution_report_summary?from="+this.date) //+"&member_id=26"
            .then(response => {this.summary = response.data.message
        console.log(response)
        console.log(this.summary)
    })
        // console.log(this.received)
    },
    computed:{
        sumTotal: function(){
            for (var val in this.summary){
                // console.log(this.summary[val].amount)
                this.total += parseFloat(this.summary[val].amount)
            }
            return this.total

        },
        trustFund: function(){
            trust = 0;
            for (var val in this.summary){
                if(this.summary[val].name ==="Tithe" ||
                    // this.summary[val].name ==="Combined Offering" ||
                    // this.summary[val].name === "Church Building" ||
                    this.summary[val].name ==="Camp Offering"){
                   trust += parseFloat(this.summary[val].amount);

                }
                if (this.summary[val].name ==="Combined Offering" ){
                    trust += parseFloat(this.summary[val].amount)/2;
                }
                // this.total += parseFloat(this.summary[val].amount)
            }
            return trust

        }
    }
});