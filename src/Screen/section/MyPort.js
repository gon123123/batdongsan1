import React, { useState } from 'react'

import BoxCardItem2button from '../../components/BoxCard2button';
import Pagination from '../../components/Pagination';
import BoxSearch from '../../components/BoxSearch';
import BoxSelect from '../../components/BoxSelect';

import DescriptionUpdate from '../../components/DescriptionUpdate';
function MyPort() {
    const [readPost, setReadPost] = useState({
        read: false,
        data: null,
    })
    const [data, setData] = useState([
        {
            image: [],
            title: "Bán ccmn nhà trọ cho thuê 5 tầng 9 ngủ tại Ô Chợ Dừa - Đê La Thành - Đống Đa - HN 50tr/ tháng",
            date: "17/11/2022",
            map: "470 tran dai nghia quan ngu hanh son ",
            price: 58757585887,
            area: 4550,
            province: "Da nang",
            star: 4,
            description: "- Vị trí cách đường ô tô: Xã Đàn - ngã 6 Ô Chợ Dừa 100m, ngõ 298 Đê La Thành ngay trung tâm thành phố HN. - Nhà dịch vụ cao cấp An House Homestay 5 tầng, bds dòng tiền đang cho thuê 50tr/ tháng, hợp đồng dài hạn. - Sẵn 100% tiện ích đồ dùng sinh hoạt: Bàn ghế gỗ, ghế sofa, /chăn ga gối đệm/tủ bát, tủ bếp, tủ quần áo/lò vi sóng, bếp từ, nồi nấu bếp từ, hút mùi, nóng lạnh, điều hoà, quạt trần/ máy giặt, máy sấy quần áo. - Liên hệ chính chủ để xem nhà nhanh gọn, không qua môi giới."
        },
        {
            image: [],
            title: "2 Bán ccmn nhà trọ cho thuê 5 tầng 9 ngủ tại Ô Chợ Dừa - Đê La Thành - Đống Đa - HN 50tr/ tháng",
            date: "18/11/2022",
            map: "550 tran dai nghia quan ngu hanh son ",
            price: 58757585887,
            area: 750,
            province: "Da nang",
            star: 5,
            description: "- Vị trí cách đường ô tô: Xã Đàn - ngã 6 Ô Chợ Dừa 100m, ngõ 298 Đê La Thành ngay trung tâm thành phố HN. - Nhà dịch vụ cao cấp An House Homestay 5 tầng, bds dòng tiền đang cho thuê 50tr/ tháng, hợp đồng dài hạn. - Sẵn 100% tiện ích đồ dùng sinh hoạt: Bàn ghế gỗ, ghế sofa, /chăn ga gối đệm/tủ bát, tủ bếp, tủ quần áo/lò vi sóng, bếp từ, nồi nấu bếp từ, hút mùi, nóng lạnh, điều hoà, quạt trần/ máy giặt, máy sấy quần áo. - Liên hệ chính chủ để xem nhà nhanh gọn, không qua môi giới."
        },
        {
            image: [],
            title: "3 Bán ccmn nhà trọ cho thuê 5 tầng 9 ngủ tại Ô Chợ Dừa - Đê La Thành - Đống Đa - HN 50tr/ tháng",
            date: "19/11/2022",
            map: "980 tran dai nghia quan ngu hanh son ",
            price: 58757585887,
            area: 50,
            province: "Quang Nam",
            star: 1,
            description: "- Vị trí cách đường ô tô: Xã Đàn - ngã 6 Ô Chợ Dừa 100m, ngõ 298 Đê La Thành ngay trung tâm thành phố HN. - Nhà dịch vụ cao cấp An House Homestay 5 tầng, bds dòng tiền đang cho thuê 50tr/ tháng, hợp đồng dài hạn. - Sẵn 100% tiện ích đồ dùng sinh hoạt: Bàn ghế gỗ, ghế sofa, /chăn ga gối đệm/tủ bát, tủ bếp, tủ quần áo/lò vi sóng, bếp từ, nồi nấu bếp từ, hút mùi, nóng lạnh, điều hoà, quạt trần/ máy giặt, máy sấy quần áo. - Liên hệ chính chủ để xem nhà nhanh gọn, không qua môi giới."
        },
    ])
    const HandlerRead = (data) => {
        setReadPost({
            read: true,
            data: data,
        })
    }
    const HandlerVisible = () => {
        if (readPost.read === true) {
            return <DescriptionUpdate data={readPost.data}></DescriptionUpdate>
        } else {
            return <div className="boxPost">
                <div className="filterData">
                    {/* <select className="filterData_select" name="price" id="price">
            <option value="increase">increase</option>
            <option value="reduce">reduce</option>
        </select> */}
                    <BoxSelect></BoxSelect>
                    <BoxSearch></BoxSearch>
                </div>
                <p className="boxTitle">My Post</p>
                <div className="boxCard">
                    {
                        data.map((item, index) => {
                            return <BoxCardItem2button key={index} data={item} handler={HandlerRead}></BoxCardItem2button>
                        })
                    }
                </div>
                <Pagination></Pagination>
                <p className="boxTitle">Waiting for approval</p>
                <div className="slider">
                    <div className="boxTable">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>num</th>
                                    <th>name</th>
                                    <th>process</th>
                                    <th>start</th>
                                    <th>view</th>
                                    <th>del</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Ban ccmn nhaf tro thue 5 tang..</td>
                                    <td>success</td>
                                    <td>
                                        <div className="star">
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>&nbsp;
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>&nbsp;
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>&nbsp;
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>&nbsp;
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>
                                        </div>
                                    </td>
                                    <td>
                                        <button type="button" className="btn_table">view</button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn_table del">del</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Ban ccmn nhaf tro thue 5 tang..</td>
                                    <td>success</td>
                                    <td>
                                        <div className="star">
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>&nbsp;
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>&nbsp;
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>&nbsp;
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>&nbsp;
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>
                                        </div>
                                    </td>
                                    <td>
                                        <button type="button" className="btn_table">view</button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn_table del">del</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Pagination></Pagination>
                </div>
            </div>
        }
    }
    return (
        <div className="colSection">
            <HandlerVisible></HandlerVisible>
        </div>
    )
}
export default MyPort