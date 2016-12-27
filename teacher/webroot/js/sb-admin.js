var curr_id = 0;
var depenID = 0;
var tax = {
    mincome: 0,
    yearlySalary: 0,
    sss: 0,
    pagibig: 0,
    philhealth: 0,
    deminimis: 0,
    personal_exemption: 0,
    addition_exemption: 0,
    monthlyTax: 0,
    yearlyTax: 0,
    empId: 0,
    term: 0,
    dpStart: 0,
    dpEnd: 0
}

$(function() {
    $('#calendar, #start-export, #end-export').datepicker({
        format: "yyyy-mm-dd"
    });  
    $('#holidayDate').datepicker({
        format: "yyyy-mm-dd"
    });
    $('#dependent').datepicker({
        format: "yyyy-mm-dd"
    });
});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
$(function() {
    $(window).bind("load resize", function() {
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.sidebar-collapse').addClass('collapse')
        } else {
            $('div.sidebar-collapse').removeClass('collapse')
        }
    })
})

$(function() {
    // remove employe in admin list
    $('.btn_delete').click(function(){
        var id = $(this).data('id');
        var btn = $(this).closest('tr');
        $('.deleteConfirm').attr('data-id', id);
    });

    $('.deleteConfirm').click(function(){
        var id = $(this).data('id');
        $.ajax({
            url:'/admin/employees/delete_employee/',
            type: 'post',
            data:{id : id},
            success: function (e) {
               location.reload();
            }
        });
    });

    // change employe role in admin list
   /* $('.select_role').change(function(){
        var id = $(this).data('id');
        var btn = $(this).closest('tr');
        $.ajax({
            url:'/admin/employees/change_role_employee/',
            type: 'post',
            data:{id : id, 'role': $(this).val()},
            success: function (e) {
               
            }
        });
    });*/
    
    
    $('#uploadFile').on('change',function(){
        var files = !!this.files ? this.files : [];
        
        imagePreview(files, "#img-profile");
    });

    $('#uploadSig').on("change",function(){
            var files = !!this.files ? this.files : [];
            imagePreview(files, "#img-signature");
    });

    $(".view_contract").click(function() {
      var id = $(this).data('id');
      $.ajax({
          url:'/admin/employees/view_contract/',
          type: 'post',
          data:{id : id},
          success: function (e) {
            $('.box_view_contract').remove();
            $('#view_contract_modal').append(e);
          }
      });
    });
    
    $('#view_contract_modal').on('shown.bs.modal', function () {
      $('#view_contract_modal').focus()
    });
  
    $('.btn_update-dependents').click(function(e){
        curr_id = $(this).data('empid');
        loadList();
        
    });
    
    $('.btn_add-dependents').click(function(){
    });
    
    $('.btn-add-dep').click(function(){
        var id =  $('.dependent-emp').val();
        var name = $('.dependent-name').val();
        var birthdate = $('.dependent-birth').val();
        var gender = $('.dependent-gender').val();
        $.ajax({
            url:'/admin/EmployeesDependent/update_dependents/',
            type: 'post',
            data:{
                id: id,
                name: name,
                birthdate: birthdate,
                gender: gender,
                employee_id: id,
                depid: depenID,
                mode:0
            },
            success: function(e) {
                loadList();     
            }
        });
        return false;
    })
    
    
    $('.btn-ups-dep').click(function(e){
        var id =  $('.dependent-emp').val();
        var name = $('.dependent-name').val();
        var birthdate = $('.dependent-birth').val();
        var gender = $('.dependent-gender').val();
       if ($(this).hasClass('disabled') !== true) {
            $.ajax({
                url:'/admin/EmployeesDependent/update_dependents/',
                type: 'post',
                data:{
                    id: id,
                    name: name,
                    birthdate: birthdate,
                    gender: gender,
                    employee_id: id,
                    depid: depenID,
                    mode:1
                },
                success: function(e) {
                    loadList();     
                }
            });
        }
        return false;
    });
    
    $('.btn-up-dep').click(function(e){
        var dtaform = $(this).serialize();
        var id =  $('.dependent-emp').val();
        var name = $('.dependent-name').val();
        var birthdate = $('.dependent-birth').val();
        var gender = $('.dependent-gender').val();
        $.ajax({
            url:'/admin/EmployeesDependent/update_dependents/',
            type: 'post',
            data:{
                id: id,
                name: name,
                birthdate: birthdate,
                gender: gender,
                employee_id: id,
                depid: depenID,
                mode:0
            },
            success: function(e) {
                var st = JSON.parse(e);
                var dep = Number($('.dependChild').html());
                dep = dep + 1;
                $('.dependChild').html(dep);
                $('.tbldependent tbody').append("<tr>"+st.data+"</tr>");     
            }
        });
        return false;
    });
    
    $(document).on('click', '.btn-delete-dep', function(e){
        var id = $(this).data('del-id');
        $.ajax({
            url:'/admin/EmployeesDependent/delete_dependents/',
            type: 'post',
            data:{id:id},
            success: function (e) {
                var dep = $('.dependChild').html();
                dep = dep - 1;
                $('.dependChild').html(dep);
                loadList();
            }
        });
        return false;
    });
    
    $('#salary').keyup(function() {
        get_salary();
        
    });
    
    $(document).on('click', '.updDep', function() {
        depenID = $(this).data('myid');
        $('.dependent-name').val($(this).find('td:nth-child(2)').html());
        $('.dependent-birth').val($(this).find('td:nth-child(3)').html());
        $('.dependent-gender').val($(this).find('td:nth-child(4)').html());
        $('.btn-ups-dep').removeClass('disabled');
    });

    $('#add-shift').click(function(){
        $.post('/admin/shifts/add',$('#ShiftMasterIndexForm').serialize(),function(data){
            if(data != 'true') {
                var err = $.parseJSON(data);
                $.each(err,function( index , value ){
                    $('#errors').removeClass('hide');
                    $('#errors').html(' <i class="fa fa-times"></i> '+value).show().fadeOut(2500);
                });
            } else {
                window.location.href = '/admin/shifts';
            }
        });
    });

    var orgUserName = $('.editProfile #username').val();
    $('.addProfile #username, .editProfile #username').on("input", function() {
        var userInput = $(this);
        var user = userInput.val().trim();
        if (orgUserName != user) {
            $.ajax({
                url:'/admin/employees/ckUsername/',
                type: 'post',
                data:{user:user},
                success: function (data) {
                    userInput.parent('div.input').children('p').remove();
                    if (data) {
                        userInput.after('<p class="err_username" style="position: absolute; right: 0;color: red;">Username already used</p>');
                    }
                }
            });
        }
    });

  var orgEmployeeId = $('.editProfile #employee_id').val();
  $('.addProfile #employee_id, .editProfile #employee_id').on("input", function() {
    var userInput = $(this);
    var userid = userInput.val().trim();
    if (orgEmployeeId != userid) {
      $.ajax({
        url:'/admin/employees/ckEmployeeId/',
        type: 'post',
        data:{id:userid},
        success: function (data) {
          userInput.parent('div.easy-autocomplete').children('p').remove();
          if (data) {
            userInput.after('<p class="err" style="position: absolute; right: 0;color: red;">Employee ID already used</p>');
          }
        }
        
      });
    }
  });

  $('.checkAllSalary').click(function(){
    if(this.checked) {
      $('input[type="checkbox"]').each(function() {
        this.checked = true;
        $('#savePayslip').removeAttr('disabled');
      });
    }else{
      $('input[type="checkbox"]').each(function() {
        this.checked = false;
        $('#savePayslip').attr('disabled','disabled');
      });         
    }
  });

  loadPayslip();
  $('.box_salary td > input[type="checkbox"]').change(function(){
    loadPayslip();
  });

});

function loadPayslip() {
    var count;
    $('#savePayslip').attr('disabled','disabled')
    $('.box_salary td > input[type="checkbox"]').each(function() {
      if (this.checked ==  true) {
        count++;
        $('input[type="submit"]').removeAttr('disabled');
      }
    });
    if (count == 0) {
      $('#savePayslip').attr('disabled','disabled')
    }
}

function loadList() {
    $.ajax({
        url:'/admin/EmployeesDependent/dependent_list/',
        type: 'post',
        data:{
            employee_id : curr_id
        },
        success: function (e) {
            $('.ajaxDependent').html(e);
        }
    });
    
}

get_salary();
function get_salary() {
    if ($('#salary').val()) {
        tax.mincome = $('#salary').val() == "" ? 0 : parseFloat($('#salary').val());
        getDeduction().done(function() {
            calculateTaxed();
        });
    }
}

function imagePreview(files, event) {
    if (!files.length || !window.FileReader) return;
    
    
    if (/^image/.test( files[0].type)){ 
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        imageName = files[0].name;
        reader.onloadend = function(){ 
            $(event).attr("src", this.result);
        }
    }
}

function editHoliday(id, date, name, type, occurence) {
    if (occurence ==1){
        var occur1 = 'Once';
        var occur2 = 'Yearly';
    } else {
        var occur1 = 'Yearly';
        var occur2 = 'Once';
    }
    if (type == 'regular') {
        var type1 = 'regular';
        var type2 = 'special';
    } else {
        var type1 = 'special';
        var type2 = 'regular';
    }
    bootbox.dialog({
                    title: "<i class='fa fa-pencil'></i> Edit.",
                    message: '<div class="row">'+
                                '<div class="col-sm-10 col-sm-offset-1">'+
                                    '<form class="form-horizontal">'+
                                        '<div class="form-group">'+
                                            '<label for="type" id="holiday">Type</label>'+
                                            '<select id="type" class="form-control">'+
                                                '<option value="'+type1+'">'+type1+'</option>'+
                                                '<option value="'+type2+'">'+type2+'</option>'+
                                            '</select>'+
                                        '</div>'+
                                        '<div class="form-group">'+
                                            '<label for="description">Description</label>'+
                                            '<input type="text" id="description" value="'+name+'" class="form-control"/>'+
                                        '</div>'+
                                        '<div class="form-group">'+
                                            '<label for="occurence">Occurence</label>'+
                                            '<select id="occurence" class="form-control">'+
                                                '<option value="'+occur1+'">'+occur1+'</option>'+
                                                '<option value="'+occur2+'">'+occur2+'</option>'+
                                            '</select>'+
                                        '</div>'+
                                        '<div class="form-group">'+
                                            '<label for="holidayDates">Date</label>'+
                                            '<input type="text" id="holidayDates" value="'+date+'" class="form-control"/>'+
                                        '</div>'+
                                    '</form>'+
                                '</div>'+
                             '</div>',
                    buttons: {
                        success: {
                            label: "Update",
                            className: "btn-primary",
                            callback: function () {
                                var type = $('#type').val();
                                var name = $('#description').val();
                                var occurence = $('#occurence').val();
                                var date = $('#holidayDates').val();
                                $.ajax({
                                    url: 'holidays/editHoliday',
                                    dataType: 'text',
                                    type: 'post',
                                    data: {
                                        id : id,
                                        type: type,
                                        name: name,
                                        occurence: occurence,
                                        date: date
                                    },
                                    success: function(message){
                                        bootbox.alert(message, function() {
                                            location.reload();
                                        });
                                    },
                                    error: function(){
                                        bootbox.alert('Error', function() {});
                                    }
                                });
                            }
                        }
                    }
                }
            );
    $('#holidayDates').datepicker({
        format: "yyyy-mm-dd"
    });
}

function deleteHoliday(id) {
    bootbox.confirm("<i class='fa fa-trash'></i> Are you sure want to delete?", function(result) {
        if (result){
            $.ajax({
                url: 'holidays/deleteHoliday',
                dataType: 'text',
                type: 'post',
                data: {
                    id : id,
                },
                success: function(message){
                    bootbox.alert(message, function() {
                        $('.tr'+id).hide();
                    });
                },
                error: function(){
                    bootbox.alert('Error', function() {});
                }
            });
        }
    }); 
}

function getDeduction() {
    var ajax = $.post('/admin/MandatoryDeduction/getDeduction', {
        mincome: tax.mincome
    }, function(data) {
        var sss = $('#sss-section');
        var philhealth = $('#philhealth-section');
        if (data['result']) {
            sss.find('span').html("₱ " +data['sss']);
            sss.find('input').val(data['sss']);

            philhealth.find('span').html("₱ " +data['philhealth']);
            philhealth.find('input').val(data['philhealth']);

            tax.sss = data['sss'];
            tax.philhealth = data['philhealth'];
            tax.pagibig = 100; //static for now
        } else {
            sss.find('span').html('₱ 0.00');
            sss.find('input').val('₱ 0.00');

            philhealth.find('span').html('₱ 0.00');
            philhealth.find('input').val('₱ 0.00');
            console.log(data); 
            //error
        }
    }, 'JSON');
    return ajax;
}


function calculateTaxed() {
    ini();
    $.post('/admin/ContractLogs/calculateTax', tax, function(data) {
        if (data['result']) {
            tax.yearly = data['yearly'];
            tax.monthly = data['monthly'];
            // $('#contract-tax-yearly').html("₱ " + tax.yearly.formatMoney(2));
            $('#contract-tax-yearly').html("₱ " + tax.yearly.formatMoney(2));
            $('#contract-tax-monthly').html("₱ " + tax.monthly.formatMoney(2));
            $('#ContractlogMonthlyTax').val(tax.monthly);
        } else if (data['result'] == false) {
            $('#contract-tax-yearly').html("₱ 0.00" );
            $('#contract-tax-monthly').html("₱ 0.00");
            $('#ContractlogMonthlyTax').val(0);
            console.log(data);
        } else {
            console.log(data);
        }
    }, 'JSON');
}

ini();

function ini() {

    tax.dpStart = $('#dpStart').val();
    tax.empId = $('#ContractlogEmployeesId').val();
    tax.mincome = $('#txtSalary').val();
    tax.deminimis = $('#txtDeminise').val();
    tax.personal_exemption = $('#civilStatus').val();
    tax.addition_exemption = $('#children').val();
    tax.term = $('select[name=term]').val();
}
function deleteShift(id){
    if(confirm('Are you sure you want to delete this shift')){
        $.post('/admin/shifts/delete',{"id":id},function(data){
            window.location.href = '/admin/shifts';
        });
    }
}
