define(["require", "exports", 'TodoApp'], function(require, exports, TodoApp) {
    if (document.body) {
        initialize();
    } else {
        document.onload = initialize;
    }

    function initialize() {
        var app = new TodoApp();
        var body = document.body;

        // Wire up dispose on unload.
        body.addEventListener('dispose', function () {
            app.dispose();
        });

        // Wire up resize on window resize.
        body.addEventListener('resize', function () {
            app.resize();
        });

        body.appendChild(app.renderElement());

        app.activate();
    }
});
