function modal(el) {
    let imgArray = document.querySelectorAll(el),
        animData = {},
        modal,
        modalContent,
        modalImg,
        imgActive

    let defaultStyle = `
        position: fixed;
        object-fit: cover;
        transition: all 500ms ease-in-out;
        border-radius: 5px;
        overflow: hidden;
    `

    function init() {
        let html = `<div class="wm-modal">
                        <div class="wm-modal-content">
                            <img src="#" alt="wm">
                        </div>
                    </div>`

        document.body.insertAdjacentHTML('beforeend', html)
        modal = document.querySelector('.wm-modal')
        modalContent = document.querySelector('.wm-modal-content')
        modalImg = modal.querySelector('img')
        addEvent()
    }
    init()

    function addEvent() {
        imgArray.forEach(img => {
            img.addEventListener('click', open)
        })
        modal.addEventListener('click', close)
    }

    function open(event) {
        modal.style.display = 'block'
        setTimeout(() => modal.classList.add('open'))
        document.body.style.overflow = 'hidden'

        imgActive = event.target
        setAnimationData()
        animationStart()
        setTimeout(animationEnd)
    }

    function close() {
        modal.classList.remove('open')
        setTimeout(() => {
            modal.style.display = 'none'
            document.body.style.overflow = 'auto'
            styleClean()
        }, 500)
        animationStart()
    }

    function setAnimationData() {
        let mw = modalContent.offsetWidth,
            mh = modalContent.offsetHeight,
            nw = imgActive.naturalWidth,
            nh = imgActive.naturalHeight,
            ratio = Math.min(mw / nw, mh / nh)

        animData = {
            width: imgActive.offsetWidth,
            height: imgActive.offsetHeight,
            left: imgActive.getBoundingClientRect().left,
            top: imgActive.getBoundingClientRect().top,
            anWidth: nw * ratio,
            anHeight: nh * ratio
        }
        console.log(animData)
    }

    function animationStart() {
        let styleStart = `
            top: ${animData.top}px;
            left: ${animData.left}px;
            width: ${animData.width}px;
            height: ${animData.height}px;
            
        `
        modalImg.src = imgActive.src
        modalImg.style.cssText = defaultStyle + styleStart
    }

    function animationEnd() {
        let styleEnd = `
            top: ${(window.innerHeight - animData.anHeight) / 2}px;
            left: ${(window.innerWidth - animData.anWidth) / 2}px;
            width: ${animData.anWidth}px;
            height: ${animData.anHeight}px;
        `
        modalImg.style.cssText = defaultStyle + styleEnd
    }

    function styleClean() {
        modalImg.style.cssText = '';
    }
}

modal('.wm-gallery')