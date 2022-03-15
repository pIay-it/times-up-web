<template>
    <a href="#" type="button" class="d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="94.5" height="85" viewBox="0 0 90 98">
            <defs>
                <filter id="solid_play" x="0" y="0" width="94.5" height="106.435" filterUnits="userSpaceOnUse">
                    <feOffset dy="10" input="SourceAlpha"/>
                    <feGaussianBlur stdDeviation="3" result="blur"/>
                    <feFlood flood-opacity="0.161"/>
                    <feComposite operator="in" in2="blur"/>
                    <feComposite in="SourceGraphic"/>
                </filter>
            </defs>
            <g id="Bonton_Play-IT_2" data-name="Bonton Play-IT 2" transform="translate(9 0)">
                <g transform="matrix(1, 0, 0, 1, -9, 0)" filter="url(#solid_play)">
                    <path id="solid_play-2" data-name="solid play"
                          d="M72.472,36.69,12.363,1.154C7.479-1.732,0,1.068,0,8.206V79.261a8.189,8.189,0,0,0,12.363,7.053L72.472,50.795a8.188,
                          8.188,0,0,0,0-14.105Z"
                          transform="translate(9 -0.03)" fill="#da0e20"/>
                </g>
                <text id="Play-IT" transform="translate(7 51)" fill="#fff" font-size="16" font-family="NuevoLithoPro">
                    <tspan x="0" y="0">
                        Play-IT
                    </tspan>
                </text>
            </g>
        </svg>
    </a>
</template>

<script>
export default { name: "PlayITButton" };
</script>