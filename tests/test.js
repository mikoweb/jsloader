var globalLoads = 0;

(function ($, loader) {
    "use strict";

    function scriptExists(file) {
        return $(document).find('script[src="' + file + '"]').length > 0;
    }

    QUnit.test('loader test', function(assert) {
        var loads = 0;

        QUnit.stop();
        loader.timeout(5000);
        loader.group('core');
        loader.group('app', ['core']);
        loader.group('theme', ['core', 'app']);
        loader.add('app', ['files/main.js'], true);
        loader.add('core', ['files/jquery.js', 'files/bootstrap.js'], false);
        loader.add('theme', ['files/theme.js'], true);

        loader.onLoad(function () {
            assert.strictEqual(loads, 3, 'order 3');
            assert.ok(scriptExists('files/jquery.js'), 'ok jquery.js');
            assert.ok(scriptExists('files/bootstrap.js'), 'ok bootstrap.js');
            assert.ok(scriptExists('files/main.js'), 'ok main.js');
            assert.ok(scriptExists('files/theme.js'), 'ok theme.js');

            var script = $(document).find('script[src="files/jquery.js"]').next();
            assert.strictEqual(script.attr('src'), 'files/bootstrap.js');
            script = script.next();
            assert.strictEqual(script.attr('src'), 'files/main.js');
            script = script.next();
            assert.strictEqual(script.attr('src'), 'files/theme.js');

            loads++;
            QUnit.start();
        });

        loader.onLoad('theme', function () {
            assert.strictEqual(loads, 2, 'order 2');
            assert.strictEqual(globalLoads, 4, '4 files load');
            loads++;
        });

        loader.onLoad('core', function () {
            assert.strictEqual(loads, 0, 'order 0');
            assert.strictEqual(globalLoads, 2, '2 files load');
            loads++;
        });

        loader.onLoad('app', function () {
            assert.strictEqual(loads, 1, 'order 1');
            assert.strictEqual(globalLoads, 3, '3 files load');
            loads++;
        });

        loader.init();
    });
}(jQuery, jsloader));
