let users;

    $.ajax({
        type: "get",
        url: "/admin/get-all-users",
        success(data) {
            users = data
            tableRenderer(users)
            $('#sign-up table').css('display','none')
            $('#login table').css('display','none')
        },
        error(err) {
            console.log(err);
        },
    });

    function deleteProduct(deleteId) {
        deleteId = $('#deleteId').val()
    
        $.ajax({
            type: "delete",
            url: `/admin/remove-user/${deleteId}`,
            data : deleteId,
            success: function(data) {
                $('table').remove();
                users = users.filter(item => item.username != deleteId)
                tableRenderer(users)
            },
            error(err) {
                console.log(err);
            },
        });
    }

    function tableRenderer(arrayOfObjects) {
        $.ajax({
            type: "get",
            url: "/admin/get-all-users",
            success(data) {
                users = data
            },
            error(err) {
                console.log(err);
            },
        });

        $('body').append('<table></table>')
        $('table').append('<tr></tr>')

        for (let i of Object.keys(users[0])) {
            $('tr').append(`<th>${i}</th>`)
        }

        for (let i = 0 ; i < users.length ; i++) {
            $('table').append('<tr></tr>')
            $('tr').click(function () {
                if ($('tr').index(this) == 0) return
                $('#read').css('display','flex')
                for (let j = 0 ; j < $(this).children().length ; j++) {
                    if (j == 0) {
                        $('#read').children().eq(j).text($(this).children().eq(j).text())
                    }
                    $('#read').children().eq(j).text($(this).children().eq(j).text())
                }
            });

            for (let j of Object.values(users[i])) {
                $('tr').eq(i+1).append(`<td>${j}</td>`)
            }
        }
    }