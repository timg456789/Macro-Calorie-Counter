
$(function () {

    var indexController = new IndexController();
    indexController.init();
});

function IndexController() {

    this.init = function () {;
        $('#add-food .save').click(function () {
           console.log('add food');
        });

        $('#add-food .cancel').click(function () {
           console.log('reset fields');
        });
    };

}