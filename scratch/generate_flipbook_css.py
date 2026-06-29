images = [
    "url('/gra1.jpg')",
    "url('/gra2.jpg')",
    "url('/gra3.jpeg')",
    "url('/gra4.jpeg')",
    "url('/gra5.jpg')",
    "url('/gra6.jpeg')",
    "url('/gra1.jpg')" # seamless repeat
]

N = 6
speed = 5
total_dur = N * speed  # 30s
step = 100.0 / N      # 16.6666%
mid_step = step / 2.0  # 8.3333%

css_content = f"""/* CSS Page Turning Animation compiled from SCSS for 6 images */
.imgLoader {{
    position: fixed;
    animation: preLoad 1s steps(1);
    width: 1px;
    height: 1px;
}}
@keyframes preLoad {{
"""

for i in range(N):
    percent = i * (100.0 / N)
    css_content += f"    {percent:.3f}% {{ background-image: {images[i]}; }}\n"
css_content += "    100% { display: none; }\n}\n\n"

css_content += """
.book-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    perspective: 1000px;
}

.book {
    position: relative;
    width: 420px;
    height: 300px;
    perspective: 630px;
    perspective-origin: center 50px; 
    transform: scale(2.1);
    filter: drop-shadow(0px 10px 5px rgba(0,0,0,0.2));
}

.page {
    width: 210px;
    height: 300px;
    background-color: #bbb;
    position: absolute;
    top: 0px; right: 50%;
    transform-origin: 100% 100%;
    border: 1.5px solid rgba(0, 0, 0, 0.06);
    background-size: 420px 300px;
    background-position: center;
    transform-style: preserve-3d;
}

.page:nth-child(1) { transform: rotateX(60deg) rotateY(3deg); }
.page:nth-child(2) { transform: rotateX(60deg) rotateY(4.5deg); }
.page:nth-child(3) {
    transform: rotateX(60deg) rotateY(6deg);
    animation: nextPage 30s infinite -29s steps(1);
    background-size: 420px 300px;
    background-position: -2px -2px;
}

.page:nth-child(4) { transform: rotateX(60deg) rotateY(177deg); }
.page:nth-child(5) { transform: rotateX(60deg) rotateY(175.5deg); }
.page:nth-child(6) {
    transform: rotateX(60deg) rotateY(174deg);
    overflow: hidden;
}

.page:nth-child(6)::after {
    content: '';
    width: 210px;
    height: 300px;
    position: absolute;
    top: 0px; right: 0%;
    transform-origin: center;
    transform: rotateY(180deg);
    animation: nextPage 30s -25s infinite steps(1);
    background-size: 420px 300px;
    background-position: 100% -2px;
}

@keyframes nextPage {
"""

for i in range(N):
    percent = i * step
    css_content += f"    {percent:.3f}% {{ background-image: {images[i]}; }}\n"
css_content += "}\n\n"

css_content += """
.gap {
    width: 2px;
    height: 300px;
    background: rgba(0, 0, 0, 0.08);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    transform: rotateX(60deg);
    transform-origin: bottom;
    position: absolute;
    top: 0px; left: calc(50% - 1px);
    z-index: 10;
}

.gap::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    background-color: rgba(0, 0, 0, 0.15);
    width: 6px;
    height: 3px;
    border-radius: 50%;
}

.pages, .flips {
  transform-style: preserve-3d;
}

.flip {
    width: 32px;
    height: 300px;
    position: absolute;
    top: 0px;
    transform-origin: 100% 100%;
    right: 100%;
    border: solid rgba(0, 0, 0, 0.06);
    border-width: 1.5px 0px;
    perspective: 4200px;
    perspective-origin: center; 
    transform-style: preserve-3d;
    background-size: 420px 300px;
}

.flip::after {
    content: '';
    position: absolute;
    top: 0px; right: 0%;
    width: 100%; height: 100%;
    transform-origin: center;
    background-size: 420px 300px;
}

.flip.flip1 {
    right: 50%;
    animation: flip1 5s infinite ease-in-out;
    border-width: 1.5px 0px;
}

.flip.flip1::after {
    animation: nextFlip1 30s -25s infinite steps(1);
}

.flip:not(.flip1) {
    right: calc(100% - 2px);
    top: -2px;
    transform-origin: right;
    animation: flip2 5s ease-in-out infinite;
}

.flip.flip7 {
    width: 30px;
    border-width: 1.5px 0px;
}
"""

# nextFlip1 animation
css_content += "\n@keyframes nextFlip1 {\n"
for i in range(N):
    percent_0 = i * step
    percent_180 = mid_step + i * step
    css_content += f"    {percent_0:.3f}% {{ background-image: {images[i]}; background-position: -178px -2px; transform: rotateY(0deg); }}\n"
    css_content += f"    {percent_180:.3f}% {{ background-image: {images[i+1]}; background-position: -210px -2px; transform: rotateY(180deg); }}\n"
css_content += "}\n"

# nextFlip2 to nextFlip6 animations
for i in range(2, 7):
    css_content += f"\n@keyframes nextFlip{i} {{\n"
    for j in range(N):
        percent_0 = j * step
        percent_180 = mid_step + j * step + (i - 1) * 0.5
        bg_pos_0 = -148 + (i - 2) * 30
        bg_pos_180 = -238 - (i - 2) * 30
        css_content += f"    {percent_0:.3f}% {{ background-image: {images[j]}; background-position: {bg_pos_0}px -2px; transform: rotateY(0deg); }}\n"
        css_content += f"    {percent_180:.3f}% {{ background-image: {images[j+1]}; background-position: {bg_pos_180}px -2px; transform: rotateY(180deg); }}\n"
    css_content += "}\n"

# nextFlipClass loops
for i in range(2, 8):
    css_content += f"\n.flip.flip{i}::after {{\n    animation: nextFlip{i} 30s -25s infinite steps(1);\n}}\n"

# nextFlip7 animation
css_content += "\n@keyframes nextFlip7 {\n"
for i in range(N):
    percent_0 = i * step
    percent_180 = (mid_step * 1.3) + i * step
    css_content += f"    {percent_0:.3f}% {{ background-image: {images[i]}; background-position: -2px -2px; transform: rotateY(0deg); }}\n"
    css_content += f"    {percent_180:.3f}% {{ background-image: {images[i+1]}; background-position: -388px -2px; transform: rotateY(180deg); }}\n"
css_content += "}\n"

css_content += """
@keyframes flip1 {
    0%, 20% { transform: rotateX(60deg) rotateY(6deg); }
    80%, 100% { transform: rotateX(60deg) rotateY(174deg); }
}

@keyframes flip2 {
    0%, 20% { transform: rotateY(0deg) translateY(0px); }
    50% { transform: rotateY(-15deg) translateY(0px); }
}

/* Remove center fold vertical lines */
.page:nth-child(1), .page:nth-child(2), .page:nth-child(3) {
    border-right: none !important;
}
.page:nth-child(4), .page:nth-child(5), .page:nth-child(6) {
    border-left: none !important;
}
"""

with open('/Users/funwithstephen/Desktop/Ritrjpm-website-main/src/components/GraduationBook.css', 'w') as f:
    f.write(css_content)

print("CSS Written successfully!")
