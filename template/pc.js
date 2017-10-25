const PCTpl = (title = '', content = '') => {
    return `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
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

module.exports = PCTpl;
