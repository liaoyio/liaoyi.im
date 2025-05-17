/* eslint-disable @next/next/no-img-element */
import type { ReactElement } from 'react'
import { readFileSync } from 'node:fs'
import { ImageResponse } from 'next/og'

const font = readFileSync('./src/lib/og/JetBrainsMono-Regular.ttf')
const fontBold = readFileSync('./src/lib/og/JetBrainsMono-Bold.ttf')

interface GenerateProps {
  title: string
  description?: string
  single: boolean
  [key: string]: any
}

export function generateOGImage(options: GenerateProps): ImageResponse {
  return new ImageResponse(
    generatePostOgImage(options),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Mono', data: font, weight: 400 },
        { name: 'Mono', data: fontBold, weight: 600 },
      ],
    },
  )
}

export function generatePostOgImage(props: GenerateProps): ReactElement {
  return (

    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        fontFamily: 'Mono',
        backgroundColor: 'white',
        padding: '48px',
      }}
    >

      <span
        style={{
          width: 40,
          height: 40,
          top: 30,
          right: 30,
          position: 'absolute',
          display: 'flex',
        }}
      >

        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 200 200" fill="none">
          <g clip-path="url(#clip0_1113_5096)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M115.295 1.2998L153.528 46.6258L162.446 130.383L94.9624 201.3L16.4463 130.15L55.9808 29.5573L115.295 1.2998ZM59.4094 37.2798L90.9446 70.5936L58.6944 117.37L24.8947 125.1L59.4094 37.2798ZM26.3158 130.963L86.2524 185.277L58.7638 123.543L26.3158 130.963ZM65.3463 123.535L95.7255 191.761L152.845 131.736L65.3463 123.535ZM155.477 121.723L148.068 52.1487L100.376 71.3063L155.477 121.723ZM95.5829 66.7325L145.647 46.6222L113.694 8.74155L63.3789 32.7121L95.5829 66.7325ZM95.323 74.8483L150.648 125.47L65.8982 117.527L95.323 74.8483Z"
              fill="url(#paint0_linear_1113_5096)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_1113_5096"
              x1="89.4463"
              y1="1.2998"
              x2="89.4463"
              y2="201.3"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFAC0B" />
              <stop offset="1" stop-color="#0B99FF" />
            </linearGradient>
            <clipPath id="clip0_1113_5096">
              <rect width="200" height="200" fill="white" />
            </clipPath>
          </defs>
        </svg>

      </span>

      <div style={{ height: 60, marginBottom: '24px' }} />

      {/* Next.js 标签 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #E5E7EB',
          borderRadius: '9999px',
          padding: '6px 16px',
          marginBottom: '32px',
        }}
      >
        <span style={{ fontSize: '14px', color: '#374151' }}>{(props.single && props.series) ? props.series : 'Post'}</span>
      </div>

      {/* 标题 */}
      <div
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#333',
          lineHeight: 1.2,
          marginBottom: '14px',
          maxWidth: '640px',
        }}
      >
        {props.title}
      </div>
      <div style={{ fontSize: '20px', color: '#6B7280', marginBottom: '50px' }}>{props.description}</div>

      {/* 底部信息区域 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 'auto',
        }}
      >
        {/* 作者信息 */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* 头像 */}
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#6B7280',
              display: 'flex',
              alignItems: 'center',
              border: '2px solid rgba(255, 255, 255, 0.7)',
              justifyContent: 'center',
              marginRight: '16px',
              overflow: 'hidden',
            }}
          >
            <img width="60" height="60" src="https://avatars.githubusercontent.com/u/57473106" style={{ borderRadius: 128 }} />
          </div>

          {/* 作者名和日期 */}
          {
            props.single && (
              <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Mono' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>liaoyi</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '16px', color: '#6B7280' }}>{String(props.date)}</span>
                  <span style={{ fontSize: '16px', color: '#6B7280', margin: '0 8px' }}>•</span>
                  <span style={{ fontSize: '16px', color: '#6B7280' }}>{` 🕒 阅读时间：${props.minutes} 分钟（约 ${props.words} 字）`}</span>
                </div>
              </div>
            )
          }
        </div>

        {/* 网站链接 */}
        <div
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '9999px',
            fontSize: '18px',
          }}
        >

          liaoyi.imo
        </div>
      </div>
    </div>
  )
}
export function generatePostOgImagie(props: GenerateProps): ReactElement {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        padding: '48px',
      }}
    >
      <span style={{ width: 40, height: 40, top: 30, right: 30, position: 'absolute', display: 'flex' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 200 200" fill="none">
          <g clip-path="url(#clip0_1113_5096)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M115.295 1.2998L153.528 46.6258L162.446 130.383L94.9624 201.3L16.4463 130.15L55.9808 29.5573L115.295 1.2998ZM59.4094 37.2798L90.9446 70.5936L58.6944 117.37L24.8947 125.1L59.4094 37.2798ZM26.3158 130.963L86.2524 185.277L58.7638 123.543L26.3158 130.963ZM65.3463 123.535L95.7255 191.761L152.845 131.736L65.3463 123.535ZM155.477 121.723L148.068 52.1487L100.376 71.3063L155.477 121.723ZM95.5829 66.7325L145.647 46.6222L113.694 8.74155L63.3789 32.7121L95.5829 66.7325ZM95.323 74.8483L150.648 125.47L65.8982 117.527L95.323 74.8483Z"
              fill="url(#paint0_linear_1113_5096)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_1113_5096"
              x1="89.4463"
              y1="1.2998"
              x2="89.4463"
              y2="201.3"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFAC0B" />
              <stop offset="1" stop-color="#0B99FF" />
            </linearGradient>
            <clipPath id="clip0_1113_5096">
              <rect width="200" height="200" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </span>
      <div style={{ height: 60, marginBottom: '24px' }} />
      {/* Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #E5E7EB',
          borderRadius: '9999px',
          padding: '6px 16px',
          marginBottom: '32px',
        }}
      >
        <span style={{ fontSize: '14px', color: '#374151' }}>
          {props.single ? props.series : 'Blog'}
        </span>
      </div>

      {/* 标题 */}
      <div
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#333',
          lineHeight: 1.2,
          marginBottom: '14px',
          maxWidth: '640px',
        }}
      >
        {props.title}
      </div>
      <div style={{ fontSize: '20px', color: '#6B7280', marginBottom: '50px' }}>{props.description}</div>

      {/* 底部信息区域 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 'auto',
        }}
      >
        {
          props.single && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* 头像 */}
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#6B7280',
                  display: 'flex',
                  alignItems: 'center',
                  border: '2px solid rgba(255, 255, 255, 0.7)',
                  justifyContent: 'center',
                  marginRight: '16px',
                  overflow: 'hidden',
                }}
              >
                <img width="60" height="60" src="https://avatars.githubusercontent.com/u/57473106" style={{ borderRadius: 128 }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>liaoyi</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '16px', color: '#6B7280' }}>{props.date}</span>
                  <span style={{ fontSize: '16px', color: '#6B7280', margin: '0 8px' }}>•</span>
                  <span style={{ fontSize: '16px', color: '#6B7280' }}>
                    🕒 阅读时间：
                    {' '}
                    {props.minutes}
                    分钟（约
                    {props.words}
                    {' '}
                    字）
                  </span>
                </div>
              </div>
            </div>
          )
        }
        {/* 网站链接 */}
        <div style={{ backgroundColor: 'black', color: 'white', padding: '12px 24px', borderRadius: '9999px', fontSize: '18px' }}>
          liaoyi.im
        </div>
      </div>
    </div>
  )
}
