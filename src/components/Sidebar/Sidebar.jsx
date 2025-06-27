import './Sidebar.scss';

export default function Sidebar() {
    return(
        <aside className="sidebar-content">
            <div className="sidebar-icon" aria-hidden="true">📒</div>
            <h2 className="sidebar-title">Контакт-лист</h2>
            <p className="sidebar-desc">Зберігайте, редагуйте та керуйте своїми контактами швидко й зручно.</p>
        </aside>
    )
}