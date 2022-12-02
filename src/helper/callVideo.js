export function openStream() {
    const constraints = {
        audio: true,
        video: true,
    }
    return navigator.mediaDevices.getUserMedia(constraints); // cái này trả về một promise
    // navigator.mediaDevices. lấy thông tin về các thiết bị đa phương tiện 
    // navigator.mediaDevices.getUserMedia() // yêu cầu quyền truy cập và các phương tiện
}