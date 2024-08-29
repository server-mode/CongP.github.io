let socket = new WebSocket("ws://localhost:5500");

socket.onmessage = function(event) {
    let request_data = JSON.parse(event.data);
    addRequestToSubTable(request_data);
};

function addRequestToSubTable(request_data) {
    let subTable = document.getElementById('sub-table').getElementsByTagName('tbody')[0];
    let newRow = subTable.insertRow();
    newRow.insertCell(0).innerText = request_data.username;
    newRow.insertCell(1).innerText = request_data.request_time;
    newRow.insertCell(2).innerText = request_data.status;

    // Thêm sự kiện click vào hàng mới
    newRow.addEventListener('click', function() {
        // Xóa lớp 'selected' khỏi tất cả các hàng
        let rows = subTable.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            rows[i].classList.remove('selected');
        }
        // Thêm lớp 'selected' vào hàng được click
        newRow.classList.add('selected');
    });
}

function acceptRequest() {
    let subTable = document.getElementById('sub-table');
    let selectedRow = subTable.querySelector('tr.selected');
    if (selectedRow) {
        let username = selectedRow.cells[0].innerText;
        let request_time = selectedRow.cells[1].innerText;
        subTable.deleteRow(selectedRow.rowIndex);

        let mainTable = document.getElementById('main-table').getElementsByTagName('tbody')[0];
        let newRow = mainTable.insertRow();
        newRow.insertCell(0).innerText = username;
        newRow.insertCell(1).innerText = request_time;
        newRow.insertCell(2).innerText = '30 ngày';
        newRow.insertCell(3).innerText = '30 ngày';
        newRow.insertCell(4).innerText = 'Hoạt động';
        newRow.insertCell(5).innerText = '5';

        // Gửi phản hồi về server
        let response_data = {
            username: username,
            request_time: request_time,
            status: 'accepted'
        };
        socket.send(JSON.stringify(response_data));
    } else {
        alert('Vui lòng chọn một yêu cầu để chấp nhận.');
    }
}

function rejectRequest() {
    let subTable = document.getElementById('sub-table');
    let selectedRow = subTable.querySelector('tr.selected');
    if (selectedRow) {
        subTable.deleteRow(selectedRow.rowIndex);
    } else {
        alert('Vui lòng chọn một yêu cầu để từ chối.');
    }
}

function showInfoDialog() {
    document.getElementById('info-dialog').style.display = 'flex';
}

function showSendWarnDialog() {
    document.getElementById('send-warn-dialog').style.display = 'flex';
}

function closeDialog(dialogId) {
    document.getElementById(dialogId).style.display = 'none';
}