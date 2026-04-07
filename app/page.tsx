'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import QRCode from 'qrcode'
import { Win98Button } from './win98-button'
import Link from 'next/link'

export default function Home() {
  const [url, setUrl] = useState('')
  const [svgMarkup, setSvgMarkup] = useState('')
  const prevUrlRef = useRef(url)

  const handleUrlChange = useCallback((value: string) => {
    const hadContent = prevUrlRef.current.trim().length > 0
    const hasContent = value.trim().length > 0
    prevUrlRef.current = value
    setUrl(value)
    if (hadContent && !hasContent) {
      setSvgMarkup('')
    }
  }, [])

  useEffect(() => {
    const trimmed = url.trim()
    if (!trimmed) return

    let cancelled = false
    QRCode.toString(trimmed, {
      type: 'svg',
      margin: 2,
      color: { dark: '#000000', light: '#00000000' },
    }).then((svg) => {
      if (!cancelled) setSvgMarkup(svg)
    })

    return () => {
      cancelled = true
    }
  }, [url])

  const handleSaveSVG = useCallback(() => {
    if (!svgMarkup) return
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'qrcode.svg'
    a.click()
    URL.revokeObjectURL(a.href)
  }, [svgMarkup])

  const handleSavePNG = useCallback(() => {
    if (!url.trim()) return
    const canvas = document.createElement('canvas')
    const size = 1024
    canvas.width = size
    canvas.height = size

    QRCode.toCanvas(canvas, url, {
      width: size,
      margin: 2,
      color: { dark: '#000000', light: '#00000000' },
    }).then(() => {
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = 'qrcode.png'
      a.click()
    })
  }, [url])

  return (
    <>
      <div className="win98-raised flex flex-col w-full max-w-145 p-0.75">
        <header className="win98-titlebar flex items-center justify-between px-1.5 py-0.5 text-white font-bold text-sm">
          <span>QR Generator - with no bullshit</span>
          <div className="flex gap-0.5">
            {['_', '□', '×'].map((label) => (
              <div
                key={label}
                className="win98-raised-sm flex items-center justify-center w-4 h-3.5 text-[10px] text-black cursor-default font-[Arial,sans-serif]"
              >
                {label}
              </div>
            ))}
          </div>
        </header>

        <nav className="flex gap-4 px-2.5 py-0.5 text-[13px] border-b border-(--border-gray)">
          <div className="cursor-default">
            <span className="underline">F</span>ile
          </div>
          <div className="cursor-default">
            <span className="underline">E</span>dit
          </div>
          <div className="cursor-default">
            <span className="underline">H</span>elp
          </div>
        </nav>

        <div className="flex flex-col gap-3 p-3">
          <fieldset className="win98-fieldset relative p-[15px_10px_10px_10px]">
            <legend className="absolute -top-2.5 left-2.5 bg-(--bg-system) px-1.5 text-[13px]">
              Website URL
            </legend>
            <div className="win98-sunken bg-white p-0.5">
              <input
                type="text"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://example.com"
                className="w-full border-none outline-none bg-transparent font-(--font-win) text-[13px] px-0.5 py-px"
              />
            </div>
          </fieldset>

          <fieldset className="win98-fieldset relative p-[15px_10px_10px_10px]">
            <legend className="absolute -top-2.5 left-2.5 bg-(--bg-system) px-1.5 text-[13px]">
              Preview
            </legend>
            <div className="win98-sunken flex items-center justify-center bg-white min-h-50 p-2.5">
              {svgMarkup ? (
                <div
                  className="w-full max-w-50"
                  dangerouslySetInnerHTML={{ __html: svgMarkup }}
                />
              ) : (
                <div className="flex items-center justify-center w-full border-2 border-dashed border-(--border-gray) py-7.5 px-2.5 text-(--border-gray) text-xs text-center">
                  Your QR will appear here
                </div>
              )}
            </div>
          </fieldset>

          <div className="flex gap-2 justify-end">
            <Win98Button onClick={handleSaveSVG} disabled={!svgMarkup}>
              Save as SVG
            </Win98Button>
            <Win98Button onClick={handleSavePNG} disabled={!svgMarkup}>
              Save as PNG
            </Win98Button>
          </div>
        </div>

        <div className="win98-sunken mt-1 px-1.5 py-0.5 text-xs text-(--border-gray)">
          {url.trim() ? 'Ready' : 'Enter a URL to generate a QR code'}
        </div>
      </div>
      <div className='absolute bottom-2 left-2 win98-btn px-3 py-2'>
        <p className="text-center text-xl text-black">
          Created by{' '}
          <Link href="https://www.urani.site/" target="_blank">
            urani
          </Link>
        </p>
      </div>
    </>
  )
}
