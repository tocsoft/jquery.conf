/// <reference path="jquery-1.9.1.js" />
(function ($) {

    $.confirmDialog = {
        autoWire: function (attr, options) {
            //if attr is an object then its really the options
            if ($.isPlainObject(attr)) {
                options = attr;
                attr = null;
            }

            options = $.extend({ messageAttribute: attr || $.confirmDialog.defaultOptions.messageAttribute }, options || {})

            $(document).on('click', '['+options.messageAttribute+']', function (e) {                
                var dlg = getDialog(this, options);
                dlg.clickNode(e);
            });
        }
    };
    $.confirmDialog.defaultOptions = {
        message: "",
        messageAttribute: "data-confirm",
        confirmButtonText: "Confirm",
        confirmButtonAttribute: "data-btn-confirm",
        cancelButtonText: "Cancel",
        cancelButtonAttribute: "data-btn-cancel"
    };
    
    $.fn.confirmDialog = function (options) {
        return this.each(function () {
                getDialog(this);
            });
    };

    var getDialog = function (node, options) {

        var opts = $.extend({}, $.confirmDialog.defaultOptions, options);

        var node = $(node);

        var dlg = node.data('confirmDialog_inst') || new confirmDialog(node, opts);

        node.data('confirmDialog_inst', dlg);

        return dlg;
    }
    

    var confirmDialog = function (node, options) {


        this.clickNode = function (e) {
            if (node.data("confirmResult") == "confirmed") {
                node.data("confirmResult", "");
            } else {
                e.preventDefault();
                showConfirmBox();
            }
        };

        node.click(this.clickNode);

        var confirmBox;
        function showConfirmBox() {
            
            remove();

            var msg = node.attr(options.messageAttribute) || options.message;
            var confirmText = node.attr(options.confirmButtonAttribute) || options.confirmButtonText;
            var cancelText = node.attr(options.cancelButtonAttribute) || options.cancelButtonText;

            confirmBox = $('<div class="confirm-box" />');
            var confirmBoxInner = $('<div class="confirm-box-inner" />');
            confirmBox.append(confirmBoxInner);
            var confirmMsg = $('<div class="confirm-msg" />').html(msg.replace(/\\n/g, '<br />'));
            var confirmBtn = $('<button class="btn-confirm">Confirm</button>').text(confirmText);
            var cancelBtn = $('<button class="btn-cancel">Cancel</button>').text(cancelText);

            confirmBoxInner.append(confirmMsg).append(cancelBtn).append(confirmBtn);
            $('body').append(confirmBox);

            confirmBtn.click(confirm);
            cancelBtn.click(cancel);
        }

        function confirm() {
            remove();
            node.data("confirmResult", "confirmed");
            if (node.attr('type') == 'submit')
                node.submit();
            else
                node.click();

        }

        function remove() {
            if (confirmBox != null) {
                confirmBox.remove();
                confirmBox = null;
            }
        }
        function cancel() {
            remove();
            node.data("confirmResult", "");
        }
    }
})(jQuery)