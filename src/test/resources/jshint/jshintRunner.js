// http://www.asyncdev.net/2011/08/javascript-code-quality-as-part-of-your-build/

load("jshint.js");
load("options.js");

// invoked by Ant with list of js files to run jshint on

(function validateMultipleFiles(args) {

    function getErrors(file) {

        var input = readFile(file);
        if (!input) {
            print('jshint: Couldn\'t open file ' + file);
            return 1;
        }

        if (!JSHINT(input, JSLINT_OPTIONS)) {
            
            print('\nErrors in ' + file + '\n');
            JSHINT.errors.forEach(function (err) {
                print('    ' + err.reason + ' (line: ' + err.line + ', character: ' + err.character + ')');
                print('    > ' + (err.evidence || '').replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1") + '\n');
            });
            return JSHINT.errors.length;
        }

        return 0;
    }

  
    var totalErrors = 0;
    var files = Array.prototype.slice.call(args);
    var errors = files.forEach(function (file) {
        totalErrors += getErrors(file);
    });

    print('JsHint completed with ' + totalErrors + ' errors (mercy is ' + JSHINT_MERCY + ')');
    quit (totalErrors <= JSHINT_MERCY ? 0 : 1);

}(arguments));