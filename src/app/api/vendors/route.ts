import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 仮のデータストア（後でデータベースに置き換え）
let vendors = [
  {
    id: '1',
    code: 'VEN001',
    name: '株式会社サンプル',
    type: 'corporation',
    address: '東京都千代田区1-1-1',
    contactPerson: '山田太郎',
    phone: '03-1234-5678',
    email: 'yamada@example.com',
    isActive: true,
  },
  {
    id: '2',
    code: 'VEN002',
    name: '個人事業主 鈴木一郎',
    type: 'individual',
    address: '東京都渋谷区2-2-2',
    contactPerson: '鈴木一郎',
    phone: '03-2345-6789',
    email: 'suzuki@example.com',
    isActive: true,
  },
]

// GET: 取引先一覧の取得
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type')
  const isActive = searchParams.get('isActive')

  let filteredVendors = [...vendors]

  if (type) {
    filteredVendors = filteredVendors.filter(vendor => vendor.type === type)
  }

  if (isActive !== null) {
    filteredVendors = filteredVendors.filter(vendor => vendor.isActive === (isActive === 'true'))
  }

  return NextResponse.json(filteredVendors)
}

// POST: 新規取引先の作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // バリデーション
    if (!body.code || !body.name || !body.type) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      )
    }

    // コードの重複チェック
    if (vendors.some(vendor => vendor.code === body.code)) {
      return NextResponse.json(
        { error: 'この取引先コードは既に使用されています' },
        { status: 400 }
      )
    }

    const newVendor = {
      id: String(vendors.length + 1),
      code: body.code,
      name: body.name,
      type: body.type,
      address: body.address,
      contactPerson: body.contactPerson,
      phone: body.phone,
      email: body.email,
      isActive: body.isActive ?? true,
    }

    vendors.push(newVendor)

    return NextResponse.json(newVendor, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'リクエストの処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

// PUT: 取引先の更新
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // バリデーション
    if (!body.id || !body.code || !body.name || !body.type) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      )
    }

    const index = vendors.findIndex(vendor => vendor.id === body.id)
    if (index === -1) {
      return NextResponse.json(
        { error: '指定された取引先が見つかりません' },
        { status: 404 }
      )
    }

    // コードの重複チェック（自身を除く）
    if (vendors.some(vendor => vendor.code === body.code && vendor.id !== body.id)) {
      return NextResponse.json(
        { error: 'この取引先コードは既に使用されています' },
        { status: 400 }
      )
    }

    vendors[index] = {
      ...vendors[index],
      code: body.code,
      name: body.name,
      type: body.type,
      address: body.address,
      contactPerson: body.contactPerson,
      phone: body.phone,
      email: body.email,
      isActive: body.isActive,
    }

    return NextResponse.json(vendors[index])
  } catch (error) {
    return NextResponse.json(
      { error: 'リクエストの処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

// DELETE: 取引先の削除
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'IDが指定されていません' },
        { status: 400 }
      )
    }

    const index = vendors.findIndex(vendor => vendor.id === id)
    if (index === -1) {
      return NextResponse.json(
        { error: '指定された取引先が見つかりません' },
        { status: 404 }
      )
    }

    vendors = vendors.filter(vendor => vendor.id !== id)

    return NextResponse.json({ message: '削除が完了しました' })
  } catch (error) {
    return NextResponse.json(
      { error: 'リクエストの処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
} 