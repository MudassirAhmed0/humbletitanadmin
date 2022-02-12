import React from 'react';
import logo_header from '../assets/imgs/HT-Standard-Logo.png';

const AdminHeader = () => {
    return (
        <>
            <div className='admin-header-container'>
                <div className='admin-img-container p-1-2_abcd  abcd_row abcd_justify-between'>
                    <div className=' '>
                        {/* <i className="fa fa-bars icon-font admin-person cursor"></i> */}
                        <img className='pl-1_abcd' src={logo_header} alt='Admin Logo' />
                    </div>
                    <div className='abcd_row abcd_align-center pr-2_abcd'>
                        <i className="fas fa-user admin-person cursor"></i>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AdminHeader;
