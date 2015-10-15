exports.handler = function(event, context) {

    if (1 === '1') {
        context.fail('Strict comparison of int to string.');
    }

    if (1 !== 1) {
        context.fail('Strict comparison of int to int.');
    }

    if (1 != '1') {
        context.fail('Comparison of int to string.');
    }

    if (1 != 1) {
        context.fail('Comparison of int to int.');
    }

    if (1 + 1 != 2) {
        context.fail('Integer addition.');
    }

    var stressLevel = 10;

    for (var ct = 0; ct < stressLevel; ct++) {
        if (ct === 0) {
            console.log('testing loop of ' + 1 + ct);
        }
    }

    ping();

    context.succeed('Test is passing.');
};

ping = function () {
    console.log('ping');
};