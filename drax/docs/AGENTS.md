# DRAX Agent Instructions

## Build Commands

### Backend
```bash
cd drax/backend
pip install -r requirements.txt -q
python app.py
```

### Frontend
```bash
cd drax/frontend
npm install
npm run dev
```

## Design System Source of Truth

The ARDRAXIS design system is extracted from `homepage-ardraxis/`. All DRAX frontend code must reuse:

- **Colors**: Primary `#1d696e`, gradients from homepage sections
- **Typography**: system-ui stack, weights 300/600/700/800/900
- **Glass cards**: `rgba(0,0,0,0.25)` bg, blur(6px), radius 16px
- **Buttons**: gradient `#1d696e`→`#2d8f9a`, radius 8px
- **Animations**: float, glow, gradientShift, fade-up scroll reveal
- **Section backgrounds**: matching ARDRAXIS gradient patterns
