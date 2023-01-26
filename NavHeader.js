function NavHeader() {
    return React.createElement(
        'button',
        'Heelo World'
    )
}

const rootNode = document.getElementById('nav-header');
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(NavHeader));