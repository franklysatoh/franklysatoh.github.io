"use strict";

var url = "https://5e280f8a120f820014bf4088.mockapi.io/customers/articles";
var vm = new Vue({
    el: "#app",
    data: {
        customers: [],
        output: {
            name: '',
            email: '',
            phone: ''
        },
        listEnabledCoppy: {}
    },
    mounted: function mounted() {
        this.getCustomer();
    },
    methods: {
        getCustomer: function getCustomer() {
            var _this = this;

            axios.get("https://5e280f8a120f820014bf4088.mockapi.io/customers/articles").then(function(response) {
                // _this.customers = response.data;
                _this.processData(response.data);
            }).catch(function(error) {
                // handle error
                console.log(error);
            });
        },
        processData: function processData(data) {
            var output = {
                name: data[0].name,
                email: data[0].email,
                phone: data[0].phone
            };
            var listEnabledCoppy = {
                name: true,
                phone: true,
                email: true
            };
            var listCustomers = data.map(function(obj) {
                if (listEnabledCoppy.email && obj.email !== output.email) {
                    output.email = '';
                    listEnabledCoppy.email = false;
                }

                if (listEnabledCoppy.phone && obj.phone !== output.phone) {
                    output.phone = '';
                    listEnabledCoppy.phone = false;
                }

                if (listEnabledCoppy.name && obj.name !== output.name) {
                    output.name = '';
                    listEnabledCoppy.name = false;
                }

                return obj;
            });
            this.output = output;
            this.customers = listCustomers;
            this.listEnabledCoppy = listEnabledCoppy;
        },
        coppyItem: function coppyItem(label, data) {
            console.log(label);
            this.output[label] = data;
        }
    }
});