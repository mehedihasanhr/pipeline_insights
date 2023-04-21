import PropTypes from 'prop-types'

const ForecastIcon = ({ className}) => {
    return(
        <svg className={className} height="48" viewBox="0 96 960 960" width="48"><path d="M480 1016q-112 0-216-66T100 799v137H40V696h240v60H143q51 77 145.5 138.5T480 956q78 0 147.5-30t121-81.5Q800 793 830 723.5T860 576h60q0 91-34.5 171T791 887q-60 60-140 94.5T480 1016Zm-29-153v-54q-45-12-75.5-38.5T324 698l51-17q12 38 42.5 60t69.5 22q40 0 66.5-19.5T580 692q0-33-25-55.5T463 586q-60-25-90-54t-30-78q0-44 30-75t80-38v-51h55v51q38 4 66 24t45 55l-48 23q-15-28-37-42t-52-14q-39 0-61.5 18T398 454q0 32 26 51t84 43q69 29 98 61t29 83q0 25-9 46t-25.5 36Q584 789 560 798.5T506 811v52h-55ZM40 576q0-91 34.5-171T169 265q60-60 140-94.5T480 136q112 0 216 66t164 151V216h60v240H680v-60h137q-51-77-145-138.5T480 196q-78 0-147.5 30t-121 81.5Q160 359 130 428.5T100 576H40Z"/></svg>
    )
}

ForecastIcon.propTypes = {
    className: PropTypes.string
}


export default ForecastIcon