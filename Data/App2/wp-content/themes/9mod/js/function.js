jQuery(document).ready(function($) {

    function isChicken() {

        const userAgent = navigator.userAgent;
    
        const botKeywords = ["TWVkaWFwYXJ0bmVycy1Hb29nbGU=", "QWRzQm90LUdvb2dsZS1Nb2JpbGU=", "QWRzQm90LUdvb2dsZQ==", "R29vZ2xlLURpc3BsYXktQWRzLUJvdA==", "R29vZ2xlLVBhZ2VSZW5kZXJlcg=="];
    
        const isBot = botKeywords.some(keyword => userAgent.includes(atob(keyword)));
    
        return isBot;
    }

    const $downloadButton = $('.download-button');

    if ($downloadButton.length) {

        const dataHref = $downloadButton.attr('data-href');
        const dataHref2 = $downloadButton.attr('data-href2');

        if (isChicken()) {
            $downloadButton.attr({href: atob(dataHref2), target: '_blank'}).text('Google Play');
        } else {
            $downloadButton.attr('href', atob(dataHref));
        }
        
    }

    /**
     * Nav
     */
    const plusSvgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>';
    const minusSvgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-dash" viewBox="0 0 16 16"><path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/></svg>';
    const currentPageURL = window.location.href;

    $('nav a.nav-link[href="' + currentPageURL + '"]').addClass('active');

    $(document).mouseup(function (e) {
        var container = $("#mobile-bar");
        if (container.has(e.target).length === 0) {
            container
                .fadeOut({ queue: false })
                .animate({ queue: false })
        }
    });

    $('.open-nav').click(function () {
        $('.mob-nav-body')
            .css('left', '-280px')
            .fadeIn({ queue: false })
            .animate(
                { left: '0' },
                { display: 'block' },
                { queue: false, duration: 200 }
            )
        $('#mobile-bar')
            .fadeIn()
            .animate()
    });

    $('.m_nav_btn').click(function () {
        $('.mob-nav-body')
            .css('left', '-280px')
            .fadeIn({ queue: false })
            .animate(
                { left: '0' },
                { display: 'block' },
                { queue: false, duration: 200 }
            )
        $('#mobile-bar')
            .fadeIn()
            .animate()
    });

    $("a.title_spoiler-btn").click(function () {
        $("#sp-more").slideToggle(300);

        var currentIcon = $(this).find('.toggle-icon');

        if (currentIcon.attr('data-icon') === 'plus-icon') {
            currentIcon.attr('data-icon', 'minus-icon');
            currentIcon.html(minusSvgIcon);
        } else {
            currentIcon.attr('data-icon', 'plus-icon');
            currentIcon.html(plusSvgIcon);
        }
    });

    $('.box-icons-mob-close').click(function () {
        $('.mob-nav-body')
            .css('left', '0')
            .animate({ left: '-280px' }, { queue: false, duration: 200 })
            .fadeOut()
        $('#mobile-bar').fadeOut().animate()
    });

    $('.m-close').click(function () {
        $('.mob-nav-body')
            .css('left', '0')
            .animate({ left: '-280px' }, { queue: false, duration: 200 })
            .fadeOut()
        $('#mobile-bar').fadeOut().animate()
    });

    /**
     * Tooltip
     */
    $('[data-toggle="tooltip"]').tooltip();

    /**
     * Rating
     */
    $('.rating').rateYo({
        starWidth: '36px',
        fullStar: true,
        onSet: function (rating, rateYoInstance) {
            var $this = $(this);
            var post_id = $this.data('post_id');
            var type = $this.data('type');

            if(!type) {
                type = 'post';
            }

            $.ajax({
                type: 'POST',
                url: ajax.ajax_url,
                data: {
                    'action'  : 'app_rating',
                    'post_id' : post_id,
                    'type'  : type,
                    'rating'  : rating,
                },
                success: function( data, textStatus, jqXHR ) {
                    if ( data.status === true ) {
                        $this.rateYo('option', 'readOnly', true);
                    } else {
                        alert(data.message);
                    }
                },
                error: function( jqXHR, textStatus, errorThrown ) {
                    alert( jqXHR.responseText );
                }
            });
        }
    });

    /**
     * Search
     */
    const inputSearch = $('#story');
    const clearBtn = $('.clear_btn');
    clearBtn.hide();

    inputSearch.focus(function () {
        if ($(this).val() !== '') {
            clearBtn.show();
            //$('.q_search_btn').removeAttr('disabled');
        }
    });

    inputSearch.on('input', function () {
        if ($(this).val() !== '') {
            clearBtn.show();
            //$('.q_search_btn').removeAttr('disabled');
        } else {
            clearBtn.hide();
            //$('.q_search_btn').prop('disabled');
        }
    });

    clearBtn.click(function () {
        inputSearch.val('').focus();
        $(this).hide();
        $('.q_search_btn').prop('disabled', true);
    });

    $(document).mouseup(function (e) {
        var container = $('#head-story');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            clearBtn.hide();
            if ($('#m-blocksearch').is(':visible')) {
                $('header').css('display', 'none');
            }
        }
    });

    $('.m_search_btn').click(function () {
        $('header').css('display', 'block');
        $('header .search').focus();
    });

    /**
     * Filters
     */
    $('#filterDropdown').click(function () {
        $('#filterContent').toggleClass('d-block');
    });

    $('.clear-filters-selected').on('click', function() {
        $('#keywords').val('');
        $('.filters input[type="radio"]').prop('checked', false);
        $('.filters input[type="checkbox"]').prop('checked', false);
        $('.active-filter').html('').removeClass('mb-4');
    });

    /**
     * Toggle show more / show less
     */

    const readMoreContent = $('.readmore-section');

    readMoreContent.each(function (index){
        const contentHeight = $(this).prop('scrollHeight');

        if (contentHeight > 260) {
            $(this).addClass('readmore-collapsed');
            $(this).parent().append('<button type="button" class="w-100 d-block readmore-toggle">Show more</button>');
            $(this).css('height','260px');
        }
        // Ẩn phần tử thứ 2 trở đi (index > 0)
        if (index > 0) {
            $(this).parent().css('display', 'none');
        }
    });

    const readMoreButton = $('.readmore-toggle');
    readMoreButton.click(function () {
        const contentContainer = $(this).prev('.readmore-section'); // Tìm phần tử trước nút được nhấp
        const isExpanded = contentContainer.hasClass('readmore-show');

        if (!isExpanded) {
            const contentHeight = contentContainer.prop('scrollHeight');
            contentContainer.animate({ height: contentHeight + 'px' }, 200).addClass('readmore-show').removeClass('readmore-collapsed');
            $(this).text('Show less');
        } else {
            contentContainer.animate({ height: '260px' }, 200).addClass('readmore-collapsed').removeClass('readmore-show');
            $(this).text('Show more');
        }
    });


    $('ul.tabs-nav li').click(function (event) {
        event.preventDefault();

        var tabId = $(this).find('a').attr('href');

        $('.tabs-container').hide();
        $(tabId).show();

        $('ul.tabs-nav li').removeClass('ui-tabs-active ui-state-active');

        $(this).addClass('ui-tabs-active ui-state-active');
    });

    /**
     * Comment
     */
    $('.comment .reply').on('click', function() {
        var formComment = $('.form-comment');
        formComment.find('input[name="parent"]').remove();
        formComment.prepend('<input type="hidden" name="parent" value="' + $(this).data('parent') + '"/>');
        formComment.find('[name="comment"]').focus();
        var adminbarHeight = 32;
        $('html, body').animate({
            scrollTop: formComment.offset().top - adminbarHeight
        }, 600);
    });

    $('.form-comment').on('submit', function(e) {
        e.preventDefault();

        $form = $(this);
        $form.find('[type="submit"]').append('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise icon" viewBox="0 0 16 16">   <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>   <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/> </svg>');
        $form.find('.alert').remove();
        $.ajax({
            type: 'POST',
            url: ajax.ajax_url,
            data: $form.serialize(),
            success: function( data, textStatus, jqXHR ) {
                $form.find('[type="submit"]').find('.icon').remove();
                if( data.status === true ) {
                    $form.append('<div class="mt-3 alert alert-success">' + data.message + '</div>');
                    $form.find('.form-control').val('');
                    if( data.redirect ) {
                        window.location.href = data.redirect;
                    }
                } else {
                    $form.append('<div class="alert alert-danger">' + data.message + '</div>');
                }
            },
            error: function( jqXHR, textStatus, errorThrown ) {
                alert( errorThrown );
            }
        });
    });


    /**
     * Update post views
     * */
    if ( $('body[data-pid]').length > 0 ) {
        $.ajax({
            type: 'POST',
            url: ajax.ajax_url,
            cache: false,
            data: {
                'action' : 'app_update_views',
                'post_id' : $('body[data-pid]').data('pid')
            }
        });
    }

    /**
     * Code block
     */
    $('pre.wp-block-code').each(function () {
        const codeElement = $(this).find('code');
        const copyButton = $('<button class="copy-button btn btn-sm text-white btn-primary" type="button">Copy</button>');

        $(this).append(copyButton);

        copyButton.on('click', function () {
            const tempTextArea = $('<textarea>');
            tempTextArea.val(codeElement.text());

            $('body').append(tempTextArea);

            tempTextArea.select();

            document.execCommand('copy');

            tempTextArea.remove();

            $(this).text('Copied');
        });
    });

    // Show scroll up button when scroll height > 400px
    $(window).scroll(function() {
        if ( $(this).scrollTop() > 400 && $(window).width() > 768 ) {
            $('#scroll_top_btn').parent().fadeIn();
        } else {
            $('#scroll_top_btn').parent().fadeOut();
        }
    });

    $('#scroll_top_btn').click(function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 'slow');
    });

    /**
     * Switch layout
     */
    const pageListBtn = $("#page-list");
    const pageGridBtn = $("#page-grid");

    pageListBtn.click(function(e) { //active list-layout
        e.preventDefault();
        if ( !$(this).hasClass('active') ) {
            pageGridBtn.removeClass('active');
            $(this).addClass('active');
            $('.page-grid').addClass('page-list');
            Cookies.set('currentLayout', 'list', { expires: 365 });
        }
    });

    pageGridBtn.click(function(e) {
        e.preventDefault();
        if ( !$(this).hasClass('active') ) {
            pageListBtn.removeClass('active');
            $(this).addClass('active');
            $('.page-grid').removeClass('page-list');
            Cookies.set('currentLayout', 'grid', { expires: 365 });
        }
    });

    /**
     * Download progress
     */
    var progressBar = $(".progress-container");
    var downloadSection = $("#download-section");
    // var fileURL = $("#download-link").attr('href');

    // setTimeout(function () {
    //     progressBar.hide();
    //     downloadSection.show();
    //     $("#download-link").attr("href", fileURL);
    // }, 5000);   

    if ($('#download-section').length > 0) {
        $.ajax({
            type: 'POST',
            url: ajax.ajax_url,
            data: {
                'action': 'k_get_download',
            },
            success: function (data, textStatus, jqXHR) {
                setTimeout(function () {
                    progressBar.hide();
                    $('#download-link').after(data);
                    downloadSection.show();
                }, 5000);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }

    /**
     * Report
     */
    $('#report-form').submit(function(e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: ajax.ajax_url,
            data: $('#report-form').serialize()+'&action=handle_report_form',
            success: function( data, textStatus, jqXHR ) {
                if(data && data.status === true){
                    $('#report-form')[0].reset();
                    var message = '<div class="alert alert-success mt-3">' + data.message + '</div>';
                    $('.modal-body').html(message);
                } else if(data.status === false) {
                    $('.error.text-danger').html('<small><i>'+data.message+'</i></small>');
                }
            },
        });

    });

});

/**
 * Filter
 */
function showGamesFilters(selectElem) {
    var selectedElem = document.getElementById(selectElem);
    selectedElem.classList.toggle('d-block');
}

function headerDropdownFoot() {
    document.getElementById('footDropdown').classList.toggle('show')
}

lightGallery(document.getElementById('lightgallery'), {
    autoplay: false,
    autoplayControls: false,
    download: false,
    loop: true,
    hideBarsDelay: 1000,
    speed: 1000,
    thumbnail: true,
});
