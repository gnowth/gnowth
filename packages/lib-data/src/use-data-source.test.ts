import { act, renderHook } from '@testing-library/react'

import { useDataSource } from './use-data-source'

describe('@gnowth/lib-data: useDataSource [controlled.onCancel]', () => {
  it('dummy', () => {
    expect(1).toBe(1)
  })
})

describe('@gnowth/lib-data: useDataSource [shadow.onCancel]', () => {
  it('dummy', () => {
    expect(1).toBe(1)
  })
})

describe('@gnowth/lib-data: useDataSource [uncontrolled.onCancel]', () => {
  it('dummy', () => {
    expect(1).toBe(1)
  })
})

describe('@gnowth/lib-data: useDataSource [controlled.onChange]', () => {
  describe('with onChange and value provided', () => {
    it('calls parent onchange without name with value', async () => {
      const onChange = jest.fn()

      const { result } = renderHook(() =>
        useDataSource({ onChange, value: { child: '', existing: ['item'] } }),
      )

      await act(async () => result.current.onChange?.({ child: 'newValue' }))

      expect(onChange).toHaveBeenCalledWith({ child: 'newValue' }, undefined)
    })

    it('calls parent onchange without name with child value nested', async () => {
      const onChange = jest.fn()

      const { result } = renderHook(() =>
        useDataSource({ onChange, value: { child: '', existing: ['item'] } }),
      )

      await act(async () => result.current.onChange?.('newValue', 'child'))

      expect(onChange).toHaveBeenCalledWith({ child: 'newValue', existing: ['item'] }, undefined)
    })

    it('calls parent onchange without name with child value nested in array', async () => {
      const onChange = jest.fn()

      const { result } = renderHook(() =>
        useDataSource({ onChange, value: { child: [''], existing: ['item'] } }),
      )

      await act(async () => result.current.onChange?.('newValue', ['child', '0']))

      expect(onChange).toHaveBeenCalledWith({ child: ['newValue'], existing: ['item'] }, undefined)
    })

    it('calls parent onchange without name with child existing value nested in array', async () => {
      const onChange = jest.fn()

      const { result } = renderHook(() => useDataSource({ onChange, value: { existing: ['item'] } }))

      await act(async () => result.current.onChange?.('newValue', ['existing', '1']))

      expect(onChange).toHaveBeenCalledWith({ existing: ['item', 'newValue'] }, undefined)
    })
  })

  describe('with name, onChange and value provided', () => {
    it('calls parent onchange without name with value', async () => {
      const onChange = jest.fn()

      const { result } = renderHook(() =>
        useDataSource({ name: 'parent', onChange, value: { child: '', existing: ['item'] } }),
      )

      await act(async () => result.current.onChange?.({ child: 'newValue' }))

      expect(onChange).toHaveBeenCalledWith({ child: 'newValue' }, 'parent')
    })

    it('calls parent onchange without name with nested child value', async () => {
      const onChange = jest.fn()

      const { result } = renderHook(() =>
        useDataSource({ name: 'parent', onChange, value: { child: '', existing: ['item'] } }),
      )

      await act(async () => result.current.onChange?.('newValue', 'child'))

      expect(onChange).toHaveBeenCalledWith({ child: 'newValue', existing: ['item'] }, 'parent')
    })

    it('calls parent onchange without name with child value nested in array', async () => {
      const onChange = jest.fn()

      const { result } = renderHook(() =>
        useDataSource({ name: 'parent', onChange, value: { child: [''], existing: ['item'] } }),
      )

      await act(async () => result.current.onChange?.('newValue', ['child', '0']))

      expect(onChange).toHaveBeenCalledWith({ child: ['newValue'], existing: ['item'] }, 'parent')
    })

    it('calls parent onchange without name with child existing value nested in array', async () => {
      const onChange = jest.fn()

      const { result } = renderHook(() =>
        useDataSource({ name: 'parent', onChange, value: { child: '', existing: ['item'] } }),
      )

      await act(async () => result.current.onChange?.('newValue', ['existing', '1']))

      expect(onChange).toHaveBeenCalledWith({ child: '', existing: ['item', 'newValue'] }, 'parent')
    })
  })

  describe('with index in name, onChange and value provided', () => {
    it('calls parent onchange without name with value', async () => {
      const onChange = jest.fn()

      const { result } = renderHook(() =>
        useDataSource({
          name: ['parent', '0'],
          onChange,
          value: { child: '', existing: ['item'] },
        }),
      )

      await act(async () => result.current.onChange?.({ child: 'newValue' }))

      expect(onChange).toHaveBeenCalledWith({ child: 'newValue' }, ['parent', '0'])
    })

    it('calls parent onchange without name with nested child value', async () => {
      const onChange = jest.fn()

      const { result } = renderHook(() =>
        useDataSource({
          name: ['parent', '0'],
          onChange,
          value: { child: '', existing: ['item'] },
        }),
      )

      await act(async () => result.current.onChange?.('newValue', 'child'))

      expect(onChange).toHaveBeenCalledWith({ child: 'newValue', existing: ['item'] }, ['parent', '0'])
    })

    it('calls parent onchange without name with child value nested in array', async () => {
      const onChange = jest.fn()

      const { result } = renderHook(() =>
        useDataSource({
          name: ['parent', '0'],
          onChange,
          value: { child: [''], existing: ['item'] },
        }),
      )

      await act(async () => result.current.onChange?.('newValue', ['child', '0']))

      expect(onChange).toHaveBeenCalledWith({ child: ['newValue'], existing: ['item'] }, ['parent', '0'])
    })

    it('calls parent onchange without name with child existing value nested in array', async () => {
      const onChange = jest.fn()

      const { result } = renderHook(() =>
        useDataSource({ name: ['parent', '0'], onChange, value: { existing: ['item'] } }),
      )

      await act(async () => result.current.onChange?.('newValue', ['existing', '1']))

      expect(onChange).toHaveBeenCalledWith({ existing: ['item', 'newValue'] }, ['parent', '0'])
    })
  })
})

describe('@gnowth/lib-data: useDataSource [shadow.onChange]', () => {
  it('dummy', () => {
    expect(1).toBe(1)
  })
})

describe('@gnowth/lib-data: useDataSource [uncontrolled.onChange]', () => {
  it('dummy', () => {
    expect(1).toBe(1)
  })
})

describe('@gnowth/lib-data: useDataSource [controlled.onDelete]', () => {
  it('dummy', () => {
    expect(1).toBe(1)
  })
})

describe('@gnowth/lib-data: useDataSource [shadow.onDelete]', () => {
  it('dummy', () => {
    expect(1).toBe(1)
  })
})

describe('@gnowth/lib-data: useDataSource [uncontrolled.onDelete]', () => {
  it('dummy', () => {
    expect(1).toBe(1)
  })
})

describe('@gnowth/lib-data: useDataSource [controlled.onReset]', () => {
  it('dummy', () => {
    expect(1).toBe(1)
  })
})

describe('@gnowth/lib-data: useDataSource [shadow.onReset]', () => {
  it('dummy', () => {
    expect(1).toBe(1)
  })
})

describe('@gnowth/lib-data: useDataSource [uncontrolled.onReset]', () => {
  it('dummy', () => {
    expect(1).toBe(1)
  })
})

describe('@gnowth/lib-data: useDataSource [controlled.onSubmit]', () => {
  it('dummy', () => {
    expect(1).toBe(1)
  })
})

describe('@gnowth/lib-data: useDataSource [shadow.onSubmit]', () => {
  it('dummy', () => {
    expect(1).toBe(1)
  })
})

describe('@gnowth/lib-data: useDataSource [uncontrolled.onSubmit]', () => {
  it('dummy', () => {
    expect(1).toBe(1)
  })
})

// TODO generate connect props?
describe('@gnowth/lib-data: useDataSource [connect]', () => {
  it('dummy', () => {
    expect(1).toBe(1)
  })
})

// TODO generate warn props?
describe('@gnowth/lib-data: useDataSource [warn]', () => {
  it('dummy', () => {
    expect(1).toBe(1)
  })
})

// TODO generate trigger props?
describe('@gnowth/lib-data: useDataSource [trigger]', () => {
  it('dummy', () => {
    expect(1).toBe(1)
  })
})
