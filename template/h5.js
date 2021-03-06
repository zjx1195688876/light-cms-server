const H5Tpl = (title = '', content = '') => {
    return `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black" />
                <meta name="format-detection"content="telephone=no,email=no" />
                <title>${title}</title>
                <style type="text/css">
                    * {margin: 0; padding: 0;}
                    .header, .footer { height: 50px; line-height: 50px; font-size: 13px; text-align: center; background-color: #e5e5e5; }
                </style>
            </head>
            <body>
                <div class="header">
                    这是header
                </div>
                <div class="container">
                    ${content}
                </div>
                <div class="footer">
                    这是footer
                </div>
            </body>
            </html>`;
};

module.exports = H5Tpl;
